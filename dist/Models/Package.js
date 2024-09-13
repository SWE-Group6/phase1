"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Package = void 0;
const AllMetrics_1 = require("./AllMetrics");
class Package {
    constructor(url) {
        this.url = "";
        this.url = url;
        this.packageMetrics = new AllMetrics_1.AllMetrics(url);
        this.packageMetrics.calculateNetScore();
    }
    getMetrics() {
        // return a json object of all the values of the metrics
        console.log("Getting Metrics");
        return {
            URL: this.url,
            NetScore: this.packageMetrics.getNetScore(),
            NetScore_Latency: this.packageMetrics.getNetScoreLatency(),
            //add other metrics
            BusFactor: this.packageMetrics.metrics[0].getScore(),
            BusFactor_Latency: this.packageMetrics.metrics[0].getLatency(),
            Correctness: this.packageMetrics.metrics[1].getScore(),
            Correctness_Latency: this.packageMetrics.metrics[1].getLatency(),
            ResponsiveMaintainer: this.packageMetrics.metrics[2].getScore(),
            ResponsiveMaintainer_Latency: this.packageMetrics.metrics[2].getLatency(),
            RampUp: this.packageMetrics.metrics[3].getScore(),
            RampUp_Latency: this.packageMetrics.metrics[3].getLatency(),
            License: this.packageMetrics.metrics[4].getScore(),
            License_Latency: this.packageMetrics.metrics[4].getLatency()
        };
    }
}
exports.Package = Package;
