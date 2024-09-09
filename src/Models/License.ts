/* Celedonio G.
 * NAME: License Metric
 * DESC: Check a packages' license to see if it contains certain words. Fetch
 * their license file using GitHub API. As stated on our project board:
 * The license of the npm package should be compatible with the GNU Lesser General Public License v2.1. 
 * If the license is fully compatible, the package should score higher.
 * Proper documentation and accessibility of the license is crucial. Points could be awarded based on whether the license is clearly stated:
*/

import {Metric} from "./Metric";
import * as https from 'https';
// import * as dotenv from 'dotenv';
// TODO: import openai modules

// ask team mates about how to load tokens
// dotenv.config();
// Talk to teamates about token.
// const GITHUB_TOKEN = ...;
// const OPENAI_API_TOKEN = ...;

export class License extends Metric {
    // arbitrary weight given to this metric.
    public weight: number = 0.2;

    constructor(url: string, version: string) {
        super(url, version);
    }
    
    // update: renamed to getRepoFile due to this method getting called when
    // retrieving both LICENSE and README files.
    // PURPOSE: fetch a repo's license using built in GET method.
    // EXPECTED OUTPUT: return an object containing the content of the license.
    // PARAMTERS: owner: string, repo: string
    getRepoFile(owner: string, repo: string, path: string): Promise<any> {
        // configuration needed to access the GitHub API.
        // found through: https://docs.github.com/en/rest/using-the-rest-api/getting-started-with-the-rest-api?apiVersion=2022-11-28#http-method
        const options = {
            hostname: 'api.github.com',
            path: `/repos/${owner}/${repo}/${path}`, // path variable set to get whatever file is needed.
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
                        if (error instanceof Error) {
                            // catch any errors while handling JSON parsing
                            reject(new Error(`Couldn't parse the data: ${error.message}`));
                        } else {
                            console.error('An unknown error occured');
                        }
                    }
                });
            }).on('error', (err) => {
                // handle the request errors.
                reject(new Error(`Request error:${err.message}`));
            });
        });
    }

    // update: renamed to decodeContent for same reasons as getFile and it
    // will return the decoded file content.
    // PURPOSE: decode a file gotten from a GET request.
    // EXPECTED OUTPUT: content of file: string or null.
    // PARAMETERS: owner: string, repo: string, path: string.
    async decodeContent(owner: string, repo: string, path: string): Promise<string | null> {
        try {
            // call the method to get the file
            const fileData = await this.getRepoFile(owner, repo, path);
            // if the license was successfully fetched
            if (fileData && fileData.content) {
                const decodedFile = Buffer.from(fileData.content, 'base64').toString('utf-8');

                // return the license type regardless if it exists or not.
                if (decodedFile) {
                    return decodedFile;
                } else {
                    console.log('Could not decode the file.');
                    return null;
                }
            }
            return null;
        // error documentation in typescript: https://engineering.udacity.com/handling-errors-like-a-pro-in-typescript-d7a314ad4991
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                return null;
            } else {
                console.error('An unknown error occured:', error);
            }
        }
    }

    // TODO: identifyLicense and rateLicense are similar enough where we can
    // identify and rate the license in one step. However, I broke it down to
    // the smallest components, thought?
    // PURPOSE: classify license based on given input
    // EXPECTED OUTPUT: string or null
    // PARAMETERS: content of license: string
    identifyLicense(content: string): string | null {
        const sanitizeContent = content.toLowerCase();

        if (sanitizeContent.includes('mit license')) {
            return 'MIT License';
        } else if (sanitizeContent.includes('gnu general public license') || sanitizeContent.includes('gpl')) {
            return 'GNU General Public License (GPL)';
        } else if (sanitizeContent.includes('gnu lesser general public license') || sanitizeContent.includes('lgpl')) {
            return 'GNU Lesser General Public License (LGPL)';
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

    // PURPOSE: rate a packages' license based on conditions discussed as a
    // group.
    // EXPECTED OUTPUT: number (float).
    // PARAMTERS: owner: string, repo: string, path: string.
    async rateLicense(owner: string, repo: string, path: string): Promise<number> {
        // get the license file of a repo, identify it, then score it.
        const getContent = await this.getRepoFile(owner, repo, path);
        const licenseType = this.identifyLicense(getContent); 

        let licenseCompatibility: number = 0.0;
        
        if (licenseType === 'GNU Lesser General Public License (LGPL)' || licenseType === 'MIT License' || licenseType === 'BSD License') {
            licenseCompatibility = 1.0; // Full compatibiliy gets full marks.
        } else if (licenseType === 'Apache License') {
            licenseCompatibility = 0.5; // Partial compatibility gets half marks. 
        } else if (licenseType === 'GNU General Public License (GPL)') {
            licenseCompatibility = 0.2; // Not very compatibile.
        } else {
            licenseCompatibility = 0.0;
        }

        return licenseCompatibility;
    }

    // PURPOSE: fulfill part two of measuring a license file. Have ChatGPT
    // analyze the content of both files, then return a value between 0 and 1.
    // EXPECTED OUTPUT: number (float).
    // PARAMETERS: license: string, readme: string.
    async evaluateDocumentation(license: string, readme: string): Promise<number> {
        // documentation for using API: 
        // 1. https://platform.openai.com/docs/guides/chat-completions
        // 2. https://cookbook.openai.com/examples/how_to_format_inputs_to_chatgpt_models
        // 3. https://www.youtube.com/watch?v=FPkgrLr0KBU
        // 4. and of course, class slides from lectures. 
        const openai = new OpenAIApi({
            apiKey: `${OPENAI_API_TOKEN}`,
        });

        const response = await openai.chat.completions.create({ 
            model: 'gpt-3.5-turbo',
            messages: [
                { role: "system", content: "You are an expert in assessing software licenses." },
                { role: "user", content: `Here is the LICENSE content: "${license}".\nHere is the README content: "${readme}".\nEvaluate if the license is mentioned clearly in both files and grade based on the following scale: 1.0: License is well-documented in both README and a LICENSE file. 0.5: License is only mentioned in one place. 0.0: License is missing or unclear.` },
            ],
        });

        // line "inspired" by the linked YouTube video.
        const assistantReply = response.choices[0]?.message?.content.trim();

        // assistantReply might be null, check here:
        if (assistantReply) {
            const score = parseFloat(assistantReply);
            return score;
        } else {
            console.error('No valid response received from the assistant');
            return 0;
        }
    }
    
    // PURPOSE: give a repo a score based on type of license they have.
    // EXPECTED OUTPUT: void
    // PARAMETERS: url: string; version: string.
    // TODO: some repos have different ways of storing LICENSE files, need to
    // account for all possible ways?
    async calculateScore(url: string, version: string): Promise<void> {
        console.log("Calculating License");
        const start = performance.now();

        // TODO: breakdown given url pieces to pass to member, especially for
        // path.
        const owner = ''; 
        const repo = '';
        const path = '';

        const compScore = 0.6;
        const docScore = 0.4;

        // load license and readme
        // I can probably make it doesn't make multiple GET requests, but
        // later.
        const licenseFile = await this.getRepoFile(owner, repo, path);
        const readmeFile = await this.getRepoFile(owner, repo, path); 

        const licenseRating = await this.rateLicense(owner, repo, path); 
        // In my test file, GPT was saying I made too many requests. 
        const documentRating = await this.evaluateDocumentation(licenseFile, readmeFile);
        
        // finally, normalize the score with the given weight.
        const finalScore = this.weight * (compScore * licenseRating + docScore * documentRating);

        const end = performance.now()
        this.latency = end - start;
        this.score = finalScore;
    }
}
