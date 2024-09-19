"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusFactor = void 0;
const Metric_1 = require("./Metric");
class BusFactor extends Metric_1.Metric {
    constructor(url) {
        super(url);
        this.weight = 0.25;
    }
    calculateScoreGithub() {
        console.log("Calculating BusFactor");
        const start = performance.now();
        const end = performance.now();
        this.latency = end - start;
        this.score = 0.16;
    }
    calculateScoreNPM() {
        console.log("Calculating BusFactor for NPM");
    }
}
exports.BusFactor = BusFactor;
