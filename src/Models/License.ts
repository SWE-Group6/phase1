/* Celedonio G. 
 * NAME: License Metric
 * 
*/

import {Metric} from "./Metric";
import axios from 'axios'; // simplify GET requests!
import dotenv from 'dotenv'; 

export class License extends Metric {
    public weight: number = 0.2;
    private owner: string = '';
    private repo: string = '';
    private githubToken: string = '';

    constructor(url: string) {
        super(url);

        // if the url is GitHub, break down into components for later
        // processing.
        if (url.includes('github.com')) {
            // generic github url is: https://github.com/owner/repo
            const parts = url.split('/');
            this.owner = parts[3];
            this.repo = parts[4];
        } 

        this.githubToken = process.env.GITHUB_TOKEN;
    }

    // methods for retrieval, identification, and scoring.
    // introduce delays after each request to prevent flooding.
    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async getFile(owner: string, repo: string, filePath: string): Promise<any> {
       const apiURL = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`; 

       try {
            const response = await axios.get(apiURL, {
                headers: {
                    Authorization: `Bearer ${this.githubToken}`
                }
            });
            return response.data;

       } catch (error) {
            // set the score to -1 if any error occurs. Should I be explicit
            // with any errors that can occur? (429, 401, 403, 404)
            this.score = -1; 
            console.error(`Error fetching ${filePath}:`, error.message);
            return null;
       }
    }

    async findLicense(owner: string, repo: string): Promise<string | null> {
        // many ways to store license files; to not take too long, here are the
        // most important ones I want to consider.
        const fileTypes = ['LICENSE', 'LICENSE.txt', 'LICENSE.md', 'package.json'];


    }

    calculateScoreGithub(): void {
        console.log("Calculating License");
        const start = performance.now();
        const end = performance.now()
        this.latency = end - start;
        this.score = 0.2;
    }

    calculateScoreNPM(): void {
        console.log("Calculating License");
        const start = performance.now();
        const end = performance.now()
        this.latency = end - start;
        this.score = 0.2;
    }
}
