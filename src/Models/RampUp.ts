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

    async getFile(filePath: string): Promise<any> {
        const apiURL = `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${filePath}`;

        try {
            const response = await axios.get(apiURL, {
                headers: {
                    Authorization: `Bearer ${this.githubToken}`,
                }
            });
            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Error fetching ${filePath}:`, error.message);
                return null;
            } else {
                console.error('An unknown error has occurred');
                return null;
            }
        }
    }

    decodeFile(encodedContent: string): string {
        const theBuffer = Buffer.from(encodedContent, 'base64');
        return theBuffer.toString('utf-8');
    }
    
    async findREADME(): Promise<string | null> {
        const repoFiles = await this.listRepoFiles();
        const fileTypes = ['readme', 'readme.txt', 'readme.md'];

        for (const file of repoFiles) {
            const normalizedFileName = file.toLowerCase();

            if (fileTypes.includes(normalizedFileName)) {
                const fileData = await this.getFile(file);

                if (fileData && fileData.content) {
                    const decodedContent = this.decodeFile(fileData);

                    if (decodedContent) {
                        return decodedContent;
                    }
                }
            }

            await this.delay(1000);
        }

        // if no readme was found, return null.
        return null;
    }

    async getNPMData(): Promise<any> {
        const apiURL = `https://registry.npmjs.org/${this.packageName}`;

        try {
            const response = await axios.get(apiURL);
            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error fetching NPM metadata:', error.message);
                return null;
            } else {
                console.error('An unknown error has occurred');
                return null;
            }
        }
    }

    async findNPMREADME(): Promise<string | null> {
        const metadata = await this.getNPMData();
        
        if (metadata && metadata.readme) {
            return metadata.readme;
        } else {
            console.warn('No readme found in the NPM metadata');
            return null;
            this.score = -1;
        }
    }

    // GPT integration.
    async rateREADME(content: string): Promise<number> {
        return 1;
    }

    async calculateScoreGithub(): Promise<void> {
        console.log("Calculating RampUp");
        const start = performance.now();

        const readmeContent: string = await this.findREADME();
        const readmeRating: number = await this.rateREADME(readmeContent); 

        const end = performance.now();
        this.latency = end - start;
        this.score = readmeRating;
    }

    async calculateScoreNPM(): Promise<void> {
        console.log("Calculating RampUp");
        const start = performance.now();
        
        const readmeContent: string = await this.findNPMREADME();
        const readmeRating: number = await this.rateREADME(readmeContent);

        const end = performance.now();
        this.latency = end - start;
        this.score = 0.5;
    }
}
