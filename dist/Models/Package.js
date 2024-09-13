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
exports.Package = Package;
