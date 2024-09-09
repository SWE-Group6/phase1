/* Celedonio G. 
 * NAME: RampUp.ts
 * DESC: Determine how easy it is for a developer to get started setting up and
 * using a given package. Fetch a packages' README file, then use ChatGPT to
 * analyze the above. Based on the issue from GitHub:
 * We will grab the readme for the given node package, and then use the GPT API to get a score for the rampup. 
 * Below is the prompt to do so: Prompt: Here is a readme for a node package. 
 * I want to calculate the rampup score, which means how easy it is for a developer to get started with this 
 * package. analyze the following readme for this package and give me a score for the package from 0 to 1 
 * for the rampup score. Give me the score only in a json format with the key as ramp_up_score and 
 * value to be the score you decide. If the readme does not exist, the score is
 * 0.
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
    // PARAMTERS: 1. owner of repo: string; 2. repo url: string.
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
            }).on('error', (err)  => {
                reject(new Error(`Request error:${err.message}`));
            });
        });
    }

    // PURPOSE: decode a file gotten from a GET request.
    // EXPECTED OUTPUT: content of file: string or null
    // PARAMETERS: 1. owner: string, 2. repo: string. 3. path: string.
    async decodedContent(owner: string, repo: string, path: string): Promise<string | null> {
        try {
            const fileData = await this.getRepoFile(owner, repo, path);

            if (fileData && fileData.content) {
                const decodedFile = Buffer.from(fileData.content, 'base64').toString('utf-8');

                if (decodedFile) {
                    return decodedFile;
                } else {
                    console.log('Could not decode the file.');
                    return null;
                }
            }
            return null;
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                return null;
            } else {
                console.error('An unknown error occured:', error);
            }
        }
    }

    
    calculateScore(url: string, version: string): void {
        console.log("Calculating RampUp");
        const start = performance.now();
        const end = performance.now();
        this.latency = end - start;
        this.score = 5;
    }
}
