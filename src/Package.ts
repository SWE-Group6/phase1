import { AllMetrics } from "./AllMetrics";
import { BusFactor } from "./BusFactor";
import  { Correctness } from "./Correctness";
import { ResponsiveMaintainer } from "./ResponsiveMaintainer";

export class Package {
    public url: string = "";
    public version: string = "";
    public metrics: AllMetrics = new AllMetrics(this.url, this.version);

    constructor(url: string, version: string) {
        this.url = url;
        this.version = version;
    }

    public getMetrics(): any {
        // return a json object of all the values of the metrics
        return {
            url: this.url,
            NetScore: this.metrics.getNetScore(),
            NetScoreLatency: this.metrics.getNetScoreLatency()
            //add other metrics
        };
    }
}