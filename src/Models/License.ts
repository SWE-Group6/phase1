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
    private packageName: string = '';

    constructor(url: string) {
        super(url);

        // if the url is GitHub, break down into components for later
        // processing.
        if (url.includes('github.com')) {
            // generic github url is: https://github.com/owner/repo
            const parts = url.split('/');
            this.owner = parts[3];
            this.repo = parts[4];
        } else if (url.includes('npmjs.com') {
            // generic npmjs url is: https://npmjs.com/package/{packageName}
            
        }

        this.githubToken = process.env.GITHUB_TOKEN;
    }

    // methods for retrieval, identification, and scoring.
    // introduce delays after each request to prevent flooding.
    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async listRepoFiles(owner:string, repo: string): Promise<string[]> {
       const apiURL = `https://api.github.com/repos/${owner}/${repo}/contents/`;

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
            } else {
                console.error('An unknown error occurred');
            }
       }
    }

    async getFile(owner: string, repo: string, filePath: string): Promise<any> {
       const apiURL = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`; 

       try {
            const response = await axios.get(apiURL, {
                headers: {
                    Authorization: `Bearer ${this.githubToken}`,
                }
            });
            return response.data;

       } catch (error) {
           if (error instanceof Error) {
                // set the score to -1 if any error occurs. Should I be explicit
                // with any errors that can occur? (429, 401, 403, 404)
                this.score = -1;
                console.error(`Error fetching ${filePath}:`, error.message);
                return null;
           } else {
                console.log('An unknown error occurred');
                return null;
           }
       }
    }

    decodeFile(encodedContent: string): string {
        const theBuffer = Buffer.from(encodedContent, 'base64');
        return theBuffer.toString('utf-8'); // decoded content is now string
    }

    parseJSON(decodedContent: string): string | null {
        try {
            const packageJSON = JSON.parse(decodedContent);
            if (packageJSON.license) {
                return packageJSON.license;
            }
            return null;
        } catch (error) {
        // return null if the json file does not have a license field.
            if (error instanceof Error) {
                console.error('Error parsing package.json:', error);
                this.score = -1;
                return null;
            }
        }
    }

    parseFile(decodedContent: string): string | null {
        const sanitizedContent = decodedContent.toLowerCase();
        if (sanitizedContent.includes('mit')) {
            return 'MIT';
        } else if (sanitizedContent.includes('gpl')) {
            return 'GPL';
        } else if (sanitizedContent.includes('lgpl')) {
            return 'LGPL';
        } else if (sanitizedContent.includes('apache')) {
            return 'APACHE';
        } else if (sanitizedContent.includes('mozilla public license')) {
            return 'MOZILLA';
        } else if (sanitizedContent.includes('bsd')) {
            return 'BSD';
        }
        // base case: no license was found in the license file. 
        return null;
    }

    async findLicense(owner: string, repo: string): Promise<string | null> {
        // many ways to store license files; to not take too long, here are the
        // most important ones I want to consider.
        const repoFiles = await this.listRepoFiles(owner, repo);
        const fileTypes = ['license', 'license.txt', 'lecense.md', 'package.json'];
        
        for (const file of repoFiles) {
            const normalizedFileName = file.toLowerCase();

            if (fileTypes.includes(normalizedFileName)) {
                const fileData = await this.getFile(owner, repo, file);

                if (fileData && fileData.content) {
                    const decodedContent = this.decodeFile(fileData.content);

                    if (file === 'package.json') {
                        const licenseType = this.parseJSON(decodedContent);
                        if (licenseType) {
                            return licenseType;
                        }
                    } else {
                        const licenseType = this.parseFile(decodedContent);
                        if (licenseType) {
                            return licenseType;
                        }
                    }
                }
            }

            await this.delay(1000);
        }

        // if no license was found, set score to -1.
        return null;
    }

    async findREADME(owner: string, repo: string): Promise<string | null> {
        const repoFiles = await this.listRepoFiles(owner, repo);
        const fileTypes = ['readme', 'readme.txt', 'readme.md'];

        for (const file of repoFiles) {
            const normalizedFileName = file.toLowerCase(); 

            if (fileTypes.includes(normalizedFileName)) {
                const fileData = await this.getFile(owner, repo, file);

                if (fileData && fileData.content) {
                    const decodedContent = this.decodeFile(fileData.content);

                    const licenseType = this.parseFile(decodedContent);
                    if (licenseType) {
                        return licenseType;
                    }
                }
            }
            await this.delay(1000);
        }

        // if no readme was found, return null
        return null;
    }

    rateLicense(licenseType: string): number {
        let licenseScore = -1;
        if (licenseType === 'MIT' || licenseType === 'LGPL' || licenseType === 'BSD') {
            licenseScore = 1.0;
        } else if (licenseType === 'APACHE') {
            licenseScore = 0.5;
        } else if (licenseType === 'GPL') {
            licenseScore = 0.2;
        }
        return licenseScore;
    }

    async calculateScoreGithub(): Promise<void> {
        console.log("Calculating License");
        const start = performance.now();

        const compScore = 0.6;
        const docScore = 0.4;

        // retrieve the license and score the license.
        const license = await this.findLicense(this.owner, this.repo);
        const licenseRating = this.rateLicense(license);
        
        const readme = await this.findREADME(this.owner, this.repo);
        let readmeRating = 0;

        if (readme == license) {
            readmeRating = 1.0;
        } else {
            readmeRating = 0;
        }

        const finalScore = this.weight * (compScore * licenseRating + docScore * readmeRating);
        const end = performance.now()
        this.latency = end - start;
        this.score = finalScore;
    }

    calculateScoreNPM(): void {
        console.log("Calculating License");
        const start = performance.now();
        const end = performance.now()
        this.latency = end - start;
        this.score = 0.2;
    }
}
