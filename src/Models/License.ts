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

    decodeFile(encodedContent: string): string {
        const buffer = Buffer.from(encodedContent, 'base64');
        return buffer.toString('utf-8'); // decoded content is now string
    }

    parseJSON(decodedContent: string): string | null {
        try {
            const packageJSON = JSON.parse(content);
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
        const fileTypes = ['LICENSE', 'LICENSE.txt', 'LICENSE.md', 'package.json'];
        
        for (const files of fileTypes) {
            const fileData = await this.getFile(owner, repo, file);
            
            // if the license was found, decode it and return immediately for
            // identification.
            if (fileData) {
                const decodedContent = this.decodeFile(fileData.content);

                if (file === 'package.json') {
                    const licenseType = this.parseJSON(decodedContent);
                    return licenseType;
                } else {
                    const licenseType = this.parseFile(decodedContent);
                    return licenseType;
                }
            }

            await this.delay(1000);
        }

        // if no license was found, set score to -1.
        this.score = -1;
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

    calculateScoreGithub(): void {
        console.log("Calculating License");
        const start = performance.now();

        // retrieve the license and score the license.
        const license = await this.findLicense(this.owner, this.repo);
        const licenseRating = this.rateLicense(license);


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
