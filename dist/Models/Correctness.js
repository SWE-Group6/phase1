"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Correctness = void 0;
const Metric_1 = require("./Metric");
class Correctness extends Metric_1.Metric {
    constructor(url) {
        super(url);
        this.weight = 0.15;
    }
    calculateScoreGithub() {
        console.log("Calculating Correctness");
        const start = performance.now();
        const end = performance.now();
        this.latency = end - start;
        this.score = 0.1;
    }
    calculateScoreNPM() {
        console.log("Calculating Correctness");
        const start = performance.now();
        const end = performance.now();
        this.latency = end - start;
        this.score = 0.1;
    }
}
exports.Correctness = Correctness;
