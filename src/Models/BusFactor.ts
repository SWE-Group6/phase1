import { Metric } from "./Metric";
import axios, { all, AxiosInstance, AxiosResponse } from 'axios';

// Define the type for contributor data
interface Contributor {
  login: string;
  contributions: number;
}

interface Commit {
  sha: string;
  author?: {
    login: string;
  };
  commiter?: {
    login: string
  };
}

interface Issue {
  author?: {
    login: string;
  };
  assignee?: {
    login: string;
  };
  pull_request?: {
    url: string;
  }
}

interface PullRequest {
  user: {
    login: string;
  };
}

// Allow for not more repitition of headers section
const githubAxios: AxiosInstance = axios.create({
  baseURL: 'https://api.github.com', // Base URL for GitHub API
  headers: {
    'Accept': 'application/vnd.github.v3+json',
  }
});

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export class BusFactor extends Metric {
  public weight: number = 0.25;
  public owner = 'fishaudio';
  repo = 'fish-speech';
  page = 1;
  perPage = 100;

  constructor(url: string, version: string) {
      super(url, version);
  }

  async calculateScore(url: string, version: string): Promise<any> {
    console.log("Calculating BusFactor");
    const start = performance.now();

    this.score = 16;

    const names = await this.getContributorsNames();
    const allCommits = await this.getContributorCommits();
    const allIssues = await this.getContributorIssues();
    const allPulls = await this.getPullRequests();

    // Calculate crucialness for each contributor
    const crucialnessScores = await Promise.all(
    names.map(name => this.calculateCrucialness(name, allCommits, allIssues, allPulls))
    );

    // Combine names with their crucialness scores
    const contributorCrucialness = names.map((name, index) => ({
    name,
    crucialness: crucialnessScores[index]
    }));

    // Sort contributors by crucialness in descending order
    contributorCrucialness.sort((a, b) => b.crucialness - a.crucialness);

    // Calculate total crucialness of all contributors
    const totalCrucialness = contributorCrucialness.reduce((sum, contributor) => sum + contributor.crucialness, 0);

    // Find the minimum number of contributors that account for 50% or more of the total crucialness
    let accumulatedCrucialness = 0;
    let busFactor = 0;

    for (const contributor of contributorCrucialness) {
      accumulatedCrucialness += contributor.crucialness;
      busFactor++;

      if (accumulatedCrucialness >= totalCrucialness * 0.5) {
      break; // Stop once we've covered 50% or more
      }
    }    

    const finalScore = (busFactor/names.length).toFixed(3);
    const end = performance.now();
    this.latency = end - start;

    console.log(`${this.owner}/${this.repo} Repo BusFactor Score: ${finalScore}`);
    console.log(``)
      
   
  }

  // Makes GET Call to github API and places contributors into array 
  async getContributorsNames(): Promise<string[]> {
    this.page = 1;
    const allContributorNames: string[] = [];

    while(true) {
      const response: AxiosResponse<Contributor[]> = await githubAxios.get(`https://api.github.com/repos/${this.owner}/${this.repo}/contributors`, {
        params: {
          page: this.page,
          per_page: this.perPage
        }
      });

      const contributorNames = response.data.map((contributor: any) => contributor.login);
      allContributorNames.push(...contributorNames);

      if (response.data.length < this.perPage) {
        return allContributorNames;
      }

      this.page++;
    }
  }

  async calculateCrucialness(contributorName: string, allCommits: Commit[], allIssues: Issue[], allPulls: PullRequest[]): Promise<number> {
    const totalCommits = allCommits.length;
    const totalIssues = allIssues.length;
    const totalPulls = allPulls.length;

    // Filter commits for this contributor
    const contributorCommits = allCommits.filter(commit => 
    commit.author?.login === contributorName || 
    commit.commiter?.login === contributorName
    );

    // Filter issues for this contributor
    const contributorIssues = allIssues.filter(issue => 
      issue.author?.login === contributorName || 
      issue.assignee?.login === contributorName
    );

    // Filter pull requests for this contributor
    const contributorPullRequests = allPulls.filter(pullrequest => 
      pullrequest.user.login === contributorName
    );

    const crucialness = 0.5*(contributorCommits.length/totalCommits) + 0.3*(contributorIssues.length/totalIssues) + 0.2*(contributorPullRequests.length/totalPulls);
    //console.log(`${contributorName} Crucialness: ${crucialness}`);
    return crucialness;
    
  }

  // Make GET Call to github API and adds up all commits
  async getContributorCommits(): Promise<Commit[]> {
    let allCommits: Commit[] = [];
    this.page = 1;

    while(true) {
      const response: AxiosResponse<Commit[]> = await githubAxios.get(`https://api.github.com/repos/${this.owner}/${this.repo}/commits`, {
        params: {
          page: this.page,
          per_page: this.perPage
        }
      });
    
      allCommits.push(...response.data);

      if (response.data.length < 100) {
        break;
      }

      this.page++;
      await sleep(1000);
    }

    return allCommits;
  }

  async getContributorIssues(): Promise<Issue[]> {
    let allIssues: Issue[] = [];
    this.page = 1;

    while(true) {
      const response: AxiosResponse<Issue[]> = await githubAxios.get(`https://api.github.com/repos/${this.owner}/${this.repo}/issues`, {
        params: {
          page: this.page,
          per_page: this.perPage,
          state: "all"
        }
      });
      
      const Issues = response.data.filter(issue => !issue.pull_request);
      allIssues.push(...Issues);

      if (response.data.length < 100) {
        break;
      }

      this.page++;
      await sleep(1000);
    }

    return allIssues;
  }
  
  async getPullRequests(): Promise<PullRequest[]> {
    let allPulls: PullRequest[] = [];
    this.page = 1;

    while(true) {
      const response: AxiosResponse<PullRequest[]> = await githubAxios.get(`https://api.github.com/repos/${this.owner}/${this.repo}/pulls`, {
        params: {
          page: this.page,
          per_page: this.perPage,
          state: 'all'
        }
      });

      allPulls.push(...response.data);

      if (response.data.length < 100) {
        break;
      }

      this.page++;
      await sleep(1000);
    }

    return allPulls;
  }
}

const Test = new BusFactor('', '');
Test.calculateScore('', '');


