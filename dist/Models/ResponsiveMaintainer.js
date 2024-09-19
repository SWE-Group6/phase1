"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponsiveMaintainer = void 0;
const Metric_1 = require("./Metric");
class ResponsiveMaintainer extends Metric_1.Metric {
    constructor(url) {
        super(url);
        this.weight = 0.25;
    }
    calculateScoreGithub() {
        console.log("Calculating ResponsiveMaintainer");
        const start = performance.now();
        const end = performance.now();
        this.latency = end - start;
        this.score = 0.10;
    }
    calculateScoreNPM() {
        console.log("Calculating ResponsiveMaintainer");
        const start = performance.now();
        const end = performance.now();
        this.latency = end - start;
        this.score = 0.10;
    }
}
exports.ResponsiveMaintainer = ResponsiveMaintainer;
