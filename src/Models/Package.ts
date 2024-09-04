import { AllMetrics } from "./AllMetrics";
import { BusFactor } from "./BusFactor";
import  { Correctness } from "./Correctness";
import { RampUp } from "./RampUp";
import { ResponsiveMaintainer } from "./ResponsiveMaintainer";

export class Package {
    public url: string = "";
    public version: string = "";
    private packageMetrics: AllMetrics;

    constructor(url: string, version: string) {
        this.url = url;
        this.version = version;
        this.packageMetrics = new AllMetrics(url, version);

        this.packageMetrics.calculateNetScore();

    }

    public getMetrics(): any {
        // return a json object of all the values of the metrics
        console.log("Getting Metrics");
        return {
            url: this.url,
            NetScore: this.packageMetrics.getNetScore(),
            NetScoreLatency: this.packageMetrics.getNetScoreLatency(),
            //add other metrics
            BusFactor: this.packageMetrics.metrics[0].getScore(),
            BusFactorLatency: this.packageMetrics.metrics[0].getLatency(),
            Correctness: this.packageMetrics.metrics[1].getScore(),
            CorrectnessLatency: this.packageMetrics.metrics[1].getLatency(),
            ResponsiveMaintainer: this.packageMetrics.metrics[2].getScore(),
            ResponsiveMaintainerLatency: this.packageMetrics.metrics[2].getLatency(),
            RampUp: this.packageMetrics.metrics[3].getScore(),
            RampUpLatency: this.packageMetrics.metrics[3].getLatency(),
            License: this.packageMetrics.metrics[4].getScore(),
            LicenseLatency: this.packageMetrics.metrics[4].getLatency(),
        };
    }
}