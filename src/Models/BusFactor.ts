import { Metric } from "./Metric";

const query = `
  query($owner: String!, $repo: String!, $cursor: String, $since: GitTimestamp!) {
    repository(owner: $owner, name: $repo) {
      ref(qualifiedName: "main") {
        target {
          ... on Commit {
            history(first: 100, after: $cursor, since: $since) {
              totalCount
              edges {
                node {
                  author {
                    name
                  }
                }
              }
              pageInfo {
                hasNextPage
                endCursor
              }
            }
          }
        }
      }
    }
  }
`;

interface CommitNode {
  node: {
    author: {
      name: string;
    }
  }
}

interface PageInfo {
  hasNextPage: boolean;
  endCursor: string;
}

interface CommitHistory {
  edges: CommitNode[];
  pageInfo: PageInfo;
  totalCount: number;
}

interface Response {
  data: {
    repository: {
      ref: {
        target: {
          history: CommitHistory;
        }
      }
    }
  }
}

export class BusFactor extends Metric {
  public weight: number = 0.25;
  public token = '';

  constructor(url: string) {
      super(url);
  }

  async calculateScoreGithub(): Promise<void> {
      console.log("Calculating BusFactor");
      const start = performance.now();

      const url_components = this.analyzeUrl(this.url);
      const result = await this.fetchGithubData(url_components.owner, url_components.repo); 

      const end = performance.now();
      this.latency = end - start;
      this.score = result;
  }
  async calculateScoreNPM(): Promise<void> {
      console.log("Calculating BusFactor for NPM");
      const start = performance.now();

      const githubUrl = await this.getGitHubUrl();

      if(githubUrl != null) {
        const url_components = this.analyzeUrl(githubUrl);
        const result = await this.fetchGithubData(url_components.owner, url_components.repo);
        const end = performance.now();
        this.latency = end - start;
        this.score = result;
      }
      else {
        const end = performance.now()
        this.latency = end - start;
        this.score = 0;
      }
      

  }

  async fetchGithubData(owner: string, repo: string): Promise<number> {
    const commitCounts: { [key: string]: number} = {};
    let cursor: string | null = null;
    let hasNextPage = true;
    let totalCount = 0;
    let crucialContributors = 0;
    let totalContributors = 0;
    const url = 'https://api.github.com/graphql';
  
    const since = new Date();
    since.setMonth(since.getMonth() - 1);

    while(hasNextPage) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify({ query, variables: { owner, repo, cursor, since: since.toISOString() } }),  // Ensure matching variable names
    });
  
    const result = await response.json() as Response;
    const data = result.data.repository.ref.target.history;
  
    data.edges.forEach((commit: CommitNode) => {
      const authorName = commit.node.author?.name || "Unknown";
      if(authorName) {
        commitCounts[authorName] = (commitCounts[authorName] || 0) + 1;
      }
    });
  
    hasNextPage = data.pageInfo.hasNextPage;
    cursor = data.pageInfo.endCursor;
  
    if(totalCount == 0) {
      totalCount = result.data.repository.ref.target.history.totalCount;
    }
  
    }
  
    for(const key in commitCounts) {
      if(commitCounts[key] > 0.10*(totalCount)) {
        crucialContributors++;
      }
      totalContributors++;
    }

    if(crucialContributors == 0) {
      return 1;
    }

    const crucialnessValue = crucialContributors/totalContributors;

    return crucialnessValue;
    
  }

  analyzeUrl(url: string): any {
    const regex = /https?:\/\/github\.com\/([^\/]+)\/([^\/]+)/;
    const match = url.match(regex);
    
    if (match) {
      return {
        owner: match[1], // First captured group (owner)
        repo: match[2],  // Second captured group (repo)
      };
    }
  
    return null; // Return null if the URL format is incorrect
  }

  async getGitHubUrl(): Promise<any> {
    // Extract the package name from the URL
    const packageName = this.url.split('/').pop();

    // Fetch the package data from the npm registry
    const response = await fetch(`https://registry.npmjs.org/${packageName}`);
    
    const data = await response.json();
    const repository = data.repository;
    
  
    if (repository && repository.url) {
      // Clean up the URL (remove 'git+' and '.git')
      const gitHubUrl = repository.url.replace(/^git\+/, '').replace(/\.git$/, '');
      return gitHubUrl;
    } else {
      console.log(`No GitHub repository found for ${packageName}`);
      return null;
    }
  }

}
