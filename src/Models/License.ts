/* Celedonio G.
 * NAME: License Metric
 * DESC: Check a packages' license to see if it contains certain words. Fetch
 * their license file using GitHub API. As stated on our project board:
 * The license of the npm package should be compatible with the GNU Lesser General Public License v2.1. 
 * If the license is fully compatible, the package should score higher.
*/

import {Metric} from "./Metric";
import * as https from 'https';
// import * as dotenv from 'dotenv';

// ask team mates about how to load tokens
// dotenv.config();
// Talk to teamates about token.
// const GITHUB_TOKEN = ...;

export class License extends Metric {
    // arbitrary weight given to this metric.
    public weight: number = 0.2;

    constructor(url: string, version: string) {
        super(url, version);
    }
    
    // PURPOSE: fetch a repo's license using built in GET method.
    // EXPECTED OUTPUT: return an object containing the content of the license.
    // PARAMTERS: owner: string, repo: string
    getLicenseFile(owner: string, repo: string, path: string): Promise<any> {
        // configuration needed to access the GitHub API.
        // found through: https://docs.github.com/en/rest/using-the-rest-api/getting-started-with-the-rest-api?apiVersion=2022-11-28#http-method
        const options = {
            hostname: 'api.github.com',
            path: `/repos/${owner}/${repo}/${path}`, // go straight to the license.
            method: 'GET',
            headers: {
                'User-Agent': 'node.js', // GitHub requires this for requests. Without it, request rejected automatically!
                'Accept': 'application/vnd.github.v3+json', // request data from v3 of GitHub's API as well as it being in JSON format.
                //'Authorization': `token ${GITHUB_TOKEN},
            }
        };

        // removed old code using axios package
        // Promise documentation found through: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Implementing_a_promise-based_API
        return new Promise((resolve, reject) => {
            https.get(options, (response) => {
                // store the chunks of data from the server to be processed
                // below.
                let data = '';

                response.on('data', (chunk) => {
                    data += chunk;
                });

                // begin data processing 
                response.on('end', () => {
                    try {
                        const parsedData = JSON.parse(data);

                        // if successful, return the data, resolving the
                        // promise. otherwise, return errors.
                        if (response.statusCode !== 200) {
                            reject(new Error(`Something went wrong! ${parsedData.message}`));
                        } else {
                            resolve(parsedData);
                        }
                    } catch (error) {
                        // catch any errors while handling JSON parsing
                        reject(new Error(`Couldn't parse the data: ${error.message}`));
                    }
                });
            }).on('error', (err) => {
                // handle the request errors.
                reject(new Error(`Request error: ${err.message}`));
            });
        });
    }

    async fetchLicense(owner: string, repo: string, path: string): Promise<void> {
        try {
            // call the method to get the file
            const licenseData = await this.getLicenseFile(owner, repo, path);
            // if the license was successfully fetched
            if (licenseData && licenseData.content) {
                const decodedLicense = Buffer.from(licenseData.content, 'base64').toString('utf-8');

                const licenseType = this.identifyLicense(decodedLicense);

                if (licenseType) {
                    console.log(`License type is: ${licenseType}`);
                } else {
                    console.log('Could not identify the license type');
                }
            }
        } catch (error) {
            console.error('Error fetching info: ', error);
        }
    }

    // PURPOSE: classify license based on given input
    // EXPECTED OUTPUT: string or null
    // PARAMETERS: content of license: string
    identifyLicense(content: string): string | null {
        const sanitizeContent = content.toLowerCase();

        if (sanitizeContent.includes('mit license')) {
            return 'MIT License';
        } else if (sanitizeContent.includes('gnu general public license') || sanitizeContent.includes('gpl')) {
            return 'GNU General Public License (GPL)';
        } else if (sanitizeContent.includes('apache license')) {
            return 'Apache License';
        } else if (sanitizeContent.includes('mozilla public license')) {
            return 'Mozilla Public License';
        } else if (sanitizeContent.includes('bsd license')) {
            return 'BSD License';
        } else {
            return null;  // License type could not be determined
        }
    }

    // TODO: Flesh out how to calculate score.
    // TODO: some repos have different ways of storing LICENSE files, need to
    // account for all possible ways?
    calculateScore(url: string, version: string): void {
        console.log("Calculating License");
        const start = performance.now();
        // call members then calculate the final score.
        // const finalLicenseScore = (
        const end = performance.now()
        this.latency = end - start;
    }
}
