"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Correctness = void 0;
const Metric_1 = require("./Metric");
class Correctness extends Metric_1.Metric {
    constructor(url, version) {
        super(url, version);
        this.weight = 0.15;
    }
    calculateScore(url, version) {
        console.log("Calculating Correctness");
        const start = performance.now();
        const end = performance.now();
        this.latency = end - start;
        this.score = 1;
    }
}
exports.Correctness = Correctness;
