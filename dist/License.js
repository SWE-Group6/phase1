"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.License = void 0;
const Metric_1 = require("./Metric");
class License extends Metric_1.Metric {
    constructor(url, version) {
        super(url, version);
        this.weight = 0.2;
    }
    calculateScore(url, version) {
        const start = performance.now();
        const end = performance.now();
        this.latency = end - start;
        return 0;
    }
}
exports.License = License;
