"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.License = void 0;
const Metric_1 = require("./Metric");
class License extends Metric_1.Metric {
    constructor(url) {
        super(url);
        this.weight = 0.2;
    }
    calculateScoreGithub() {
        console.log("Calculating License");
        const start = performance.now();
        const end = performance.now();
        this.latency = end - start;
        this.score = 0.2;
    }
    calculateScoreNPM() {
        console.log("Calculating License");
        const start = performance.now();
        const end = performance.now();
        this.latency = end - start;
        this.score = 0.2;
    }
}
exports.License = License;
