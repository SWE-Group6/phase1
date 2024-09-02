"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Package = void 0;
const AllMetrics_1 = require("./AllMetrics");
class Package {
    constructor(url, version) {
        this.url = "";
        this.version = "";
        this.metrics = new AllMetrics_1.AllMetrics(this.url, this.version);
        this.url = url;
        this.version = version;
    }
    getMetrics() {
        // return a json object of all the values of the metrics
        return {
            url: this.url,
            NetScore: this.metrics.getNetScore(),
            NetScoreLatency: this.metrics.getNetScoreLatency()
            //add other metrics
        };
    }
}
exports.Package = Package;
