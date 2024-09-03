/* Celedonio G. 
 * NAME: RampUp.ts
 * DESC: Determine how easy it is for a developer to get started setting up and
 * using a given package. Fetch a packages' README file, then use ChatGPT to
 * analyze the above. 
*/

import {Metric} from "./Metric";
import axios from 'axios'; // use the package to make requests to fetch data.
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
    async function getRepoFiles(owner: string, repo: string) {
        // create a header to provide authentication to GitHub API.
        // const headers = { Authorization: `Bearer ${GITHUB_TOKEN}` };

        try {
            // see if there is a README file included in the given package by
            // sending a GET request. GitHub responses are in json format,
            // ensure correctly handling data.
            const readmeResponse = await axios.get(`https://api.github.com/repos/${owner}/readme`, { headers, responseType: 'json' });

            // decode the base64 data gotten from the request to binary form,
            // then convert that into a string representation.
            // axios schema for response to a request 
            const readmeContent = Buffer.from(readmeResponse.data.content, 'base64').toString('utf-8');

            // if there is content in the README, return said content.
            return { readme: readmeContent };

        } catch (error) {
            // if readme doesn't exist or if there is an error then return a
            // null object.
            console.error('Error in fetching repo file: ', error);
            return { readme: null };
        }
    }

    // PURPOSE: analyze a README file using GPT API.
    // EXPECTED OUTPUT: number
    // PARAMETERS: 1. README
    async function analyzeRampUp(readmeContent: string) {
       // TODO: flesh out function 
    }

    calculateScore(url: string, version: string): number {
        // probably just call the other methods 
        const start = performance.now();
        const end = performance.now();
        this.latency = end - start;
        return 0;
    }
}
