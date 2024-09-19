"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RampUp = void 0;
const Metric_1 = require("./Metric");
class RampUp extends Metric_1.Metric {
    constructor(url) {
        super(url);
        this.weight = 0.15;
    }
    calculateScoreGithub() {
        console.log("Calculating RampUp");
        const start = performance.now();
        const end = performance.now();
        this.latency = end - start;
        this.score = 0.5;
    }
    calculateScoreNPM() {
        console.log("Calculating RampUp");
        const start = performance.now();
        const end = performance.now();
        this.latency = end - start;
        this.score = 0.5;
    }
}
exports.RampUp = RampUp;
