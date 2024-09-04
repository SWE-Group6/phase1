"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Package = void 0;
const AllMetrics_1 = require("./AllMetrics");
class Package {
    constructor(url, version) {
        this.url = "";
        this.version = "";
        this.url = url;
        this.version = version;
        this.packageMetrics = new AllMetrics_1.AllMetrics(url, version);
        this.packageMetrics.calculateNetScore();
    }
    getMetrics() {
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
exports.Package = Package;
