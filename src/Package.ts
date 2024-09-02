import { AllMetrics } from "./AllMetrics";
import { BusFactor } from "./BusFactor";
import  { Correctness } from "./Correctness";
import { ResponsiveMaintainer } from "./ResponsiveMaintainer";

export class Package {
    public url: string = "";
    public version: string = "";
    private packageMetrics: AllMetrics;

    constructor(url: string, version: string) {
        this.url = url;
        this.version = version;
        this.packageMetrics = new AllMetrics(url, version);
    }

    public getMetrics(): any {
        // return a json object of all the values of the metrics
        console.log("Getting Metrics");
        return {
            url: this.url,
            NetScore: this.packageMetrics.getNetScore(),
            NetScoreLatency: this.packageMetrics.getNetScoreLatency()
            //add other metrics
        };
    }
}