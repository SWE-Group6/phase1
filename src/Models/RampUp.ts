/* Celedonio G. 
 * NAME: RampUp.ts
 * DESC: Determine how easy it is for a developer to get started setting up and
 * using a given package. Fetch a packages' README file, then use ChatGPT to
 * analyze the above. 
*/

import {Metric} from "./Metric";
import * as https from 'https';

// TODO: Look into another package to manage sensitive data such as tokens.

// TODO: Talk to team mates about getting both tokens.
// const GITHUB_TOKEN = ...;

export class RampUp extends Metric {
    // arbitrary weight given to this metric.
    public weight: number = 0.15;

    constructor(url: string, version: string) {
        super(url, version);
    }

    // PURPOSE: fetch a repo's README file. 
    // EXPECTED OUTPUT: return an object containing the content of the README
    // for GPT to analyze.
    // PARAMTERS: 1. owner of repo: string; 2. repo url: string
    async getRepoFiles(owner: string, repo: string) {
        // create a header to provide authentication to GitHub API.
        // const headers = { Authorization: `Bearer ${GITHUB_TOKEN}` };
        const options = {
            hostname: 'api.github.com', 
            path: `/repos/${owner}/${repo}/README`,
            method: 'GET',
        }
    }

/*
    // PURPOSE: analyze a README file using GPT API.
    // EXPECTED OUTPUT: number
    // PARAMETERS: 1. README
    async analyzeRampUp(readmeContent: string) {
       // TODO: flesh out function 
    }
*/
    calculateScore(url: string, version: string): void {
        console.log("Calculating RampUp");
        const start = performance.now();
        const end = performance.now();
        this.latency = end - start;
        this.score = 5;
    }
}
