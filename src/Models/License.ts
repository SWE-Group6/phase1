/* Celedonio G. 
 * NAME: License Metric
 * 
*/

import {Metric} from "./Metric";

export class License extends Metric {
    public weight: number = 0.2;
    private owner: string = '';
    private repo: string = '';

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
