import { Metric } from "./Metric";
import { promises as fs } from "fs"; // To read files
import axios from 'axios'; // For GitHub API calls if necessary

export class Correctness extends Metric {
    public weight: number = 0.15;
    private githubScore: number = 0;
    private npmScore: number = 0;

    constructor(url: string) {
        super(url);
    }

    // Calculate score based on GitHub test results
    async calculateScoreGithub(): Promise<void> {
        console.log("Calculating GitHubCorrectness");
        const successRate = 0.1; 
        this.githubScore = 0.6 * successRate;

        console.log(`GitHub Correctness Score: ${this.githubScore}`);
    }

    // Calculate score based on NPM test coverage
    async calculateScoreNPM(): Promise<void> {
        console.log("Calculating NPM Correctness");

        try {
            // Read the coverage-summary.json file dynamically
            const data = await fs.readFile("./coverage/coverage-summary.json", "utf8");
            const coverageData = JSON.parse(data);
            const coverage = coverageData.total.lines.pct / 100; 
            this.npmScore = 0.4 * coverage; 

            console.log(`NPM Correctness Score: ${this.npmScore}`);
        } catch (err) {
            console.error("Error reading coverage file:", err);
            this.npmScore = 0; 
        }
    }

    // Final combined correctness score
    async calculateScore(): Promise<void> {
        await this.calculateScoreGithub();
        await this.calculateScoreNPM();
        this.score = this.githubScore + this.npmScore;
        console.log(`Final Combined Correctness Score: ${this.score}`);
    }

    public getGitHubScore(): number {
        return this.githubScore;
    }

    public getNpmScore(): number {
        return this.npmScore;
    }

    public getScore(): number {
        return this.score;
    }
}
