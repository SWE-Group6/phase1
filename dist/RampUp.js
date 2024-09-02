"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RampUp = void 0;
const Metric_1 = require("./Metric");
class RampUp extends Metric_1.Metric {
    constructor(url, version) {
        super(url, version);
        this.weight = 0.15;
    }
    calculateScore(url, version) {
        const start = performance.now();
        const end = performance.now();
        this.latency = end - start;
        return 0;
    }
}
exports.RampUp = RampUp;
