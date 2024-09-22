import {Metric} from "./Metric";
import axios from 'axios'; 
import dotenv from 'dotenv';

export class RampUp extends Metric {
    public weight: number = 0.15;
    private owner: string = '';
    private repo: string = '';
    private githubToken: string = '';
    private packageName: string = '';

    constructor(url: string) {
        super(url);

        // set up based on which link is provided.
        if (url.includes('github.com')) {
            const parts = url.split('/');
            this.owner = parts[3];
            this.repo = parts[4];
        } else if (url.includes('npmjs.com')) {
            const parts = url.split('/');
            this.packageName = parts[4];
        }
        this.githubToken = process.env.GITHUB_TOKEN;
    }
    
    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async listRepoFiles(): Promise<string[]> {
        const apiURL = `https://api.github.com/repos/${this.owner}/${this.repo}/contents/`;

        try {
            const response = await axios.get(apiURL, {
                headers: {
                    Authorization: `Bearer ${this.githubToken}`,
                }
            });
            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error fetching repo files:', error.message);
                return [];
            } else {
                console.error('An unknown error occured');
                return [];
            }
        }
    }

    calculateScoreGithub(): void {
        console.log("Calculating RampUp");
        const start = performance.now();
        const end = performance.now();
        this.latency = end - start;
        this.score = 0.5;
    }

    calculateScoreNPM(): void {
        console.log("Calculating RampUp");
        const start = performance.now();
        const end = performance.now();
        this.latency = end - start;
        this.score = 0.5;
    }
}
