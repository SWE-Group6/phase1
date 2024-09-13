import { AllMetrics } from "./AllMetrics";
import { BusFactor } from "./BusFactor";
import  { Correctness } from "./Correctness";
import { RampUp } from "./RampUp";
import { ResponsiveMaintainer } from "./ResponsiveMaintainer";

export class Package {
    public url: string = "";
    private packageMetrics: AllMetrics;

    constructor(url: string) {
        this.url = url;
        this.packageMetrics = new AllMetrics(url);

        this.packageMetrics.calculateNetScore();

    }

    public getMetrics(): any {
        // return a json object of all the values of the metrics
        console.log("Getting Metrics");
        return {
            URL: this.url,
            NET_SCORE: this.packageMetrics.getNetScore(),
            //add other metrics
            BUS_FACTOR_SCORE: this.packageMetrics.metrics[0].getScore(),
            CORRECTNESS_SCORE: this.packageMetrics.metrics[1].getScore(),
            RESPONSIVE_MAINTAINER_SCORE: this.packageMetrics.metrics[2].getScore(),
            RAMP_UP_SCORE: this.packageMetrics.metrics[3].getScore(),
            LICENSE_SCORE: this.packageMetrics.metrics[4].getScore()
        };
    }
}