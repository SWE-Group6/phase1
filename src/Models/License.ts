/* Celedonio G.
 * NAME: License Metric
 * DESC: Check a packages' license to see if it contains certain words. Fetch
 * their license file using GitHub API. As stated on our project board:
 * The license of the npm package should be compatible with the GNU Lesser General Public License v2.1. 
 * If the license is fully compatible, the package should score higher.
*/

import {Metric} from "./Metric";

// Talk to teamates about token.
// const GITHUB_TOKEN = ...;

export class License extends Metric {
    // arbitrary weight given to this metric.
    public weight: number = 0.2;

    constructor(url: string, version: string) {
        super(url, version);
    }
    
    // PURPOSE: fetch a repo's license.
    // EXPECTED OUTPUT: return an object containing the content of the license.
    // PARAMTERS: 1. owner of repo: string. 2: repo url: string
    async function getRepoFiles(owner: string, repo: url) {
        // create header to provide authentication to GitHub API. 
        // const headers = { Authorization: `Bearer ${GITHUB_TOKEN` };

        try {
            // see if there is a README file included in the given package by
            // sending a GET request. GitHub responses are in json format,
            // ensure correctly handling data.
            const licenseResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}/license`, { headers, responseType: 'json' });

            // decode the base64 data gotten from the request to binary form,
            // then convert that into a string representation.
            // axios schema for response to a request 
            const licenseContent = Buffer.from(licenseResponse.data.content, 'base64').toString('utf-8');

            // if there is content in the README, return said content.
            return { license: licenseContent };

        } catch (error) {
            // if it doesn't exist or if there's an error then return a null
            // object.
            console.error('Error in fetching repo file: ', error);
            return { license: licenseContent };
        }
    }

    // PURPOSE: look for valid license credentials and assign a score based on
    // what is found.
    // EXPECTED OUTPUT: number
    // PARAMETERS: content of license: string
    function evaluateLicense(licenseContent: string) { licenseCompatibilityScore: number; documentationCompatibilityScore: number } {
        // if what was fetched came back as null then it gets a zero
        // automatically 
        if (!licenseContent) {
            return { licenseCompatibilityScore: 0, documentationCompatibilityScore: 0 };
        }

        let compatibilityScore = 0;
        let documentationScore = 0;

        if (licenseContent.includes("MIT") || licenseContent.includes("LGPL-2.1")) {
            compatibilityScore = 1.0;
        } // TODO: define half a point here else if
        else {
            compatibilityScore = 0.0;
        }

        // TODO: what does it mean to have good documentation? For now, just
        // give 1.0 if there is a license present.
        documentationScore = 1.0; 
        return { licenseCompatibilityScore: compatibilityScore, documentationCompatibilityScore: documentationScore };
    }

    // TODO: Flesh out how to calculate score.
    calculateScore(url: string, version: string): number {
        console.log("Calculating License");
        const start = performance.now();
        // call members then calculate the final score.
        // const finalLicenseScore = (
        const end = performance.now()
        this.latency = end - start;
        return 0;
    }
}
