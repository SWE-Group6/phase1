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

    // PURPOSE: fetch a repo's README file using built in GET method.
    // EXPECTED OUTPUT: return an object containing the content of the README
    // for GPT to analyze.
    // PARAMTERS: 1. owner of repo: string; 2. repo url: string
    getRepoFile(owner: string, repo: string) {
        const options = {
            hostname: 'api.github.com',
            path: `/repos/${owner}/${repo}/${path}`,
            method: 'GET',
            headers: {
                'User-Agent': 'node-js',
                'Accept': 'application/vnd.github.v3+json',
            }
        };
        
        return new Promise((resolve, reject) => {
            https.get(options, (response) => {
                let data = '';

                response.on('data', (chunk) => {
                    data += chunk;
                });
                
                response.on('end', () => {
                    try {
                        const parsedData = JSON.parse(data);

                        if (response.statusCode !== 200) {
                            reject(new Error(`Something went wrong while parsing the data: ${parsedData.message}`));
                        } else {
                            resolve(parsedData);
                        }
                    } catch (error) {
                        if (error instanceof Error) {
                            reject(new Error(`Couldn't parse the data: ${error.message}`));
                        } else {
                            console.error('An unknown error occured');
                        }
                    }
                });
            });
        });
    }

    calculateScore(url: string, version: string): void {
        console.log("Calculating RampUp");
        const start = performance.now();
        const end = performance.now();
        this.latency = end - start;
        this.score = 5;
    }
}
