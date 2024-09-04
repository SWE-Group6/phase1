"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metric = void 0;
class Metric {
    constructor(url, version) {
        this.score = 0;
        this.latency = 0;
        this.url = url;
        this.version = version;
    }
    getScore() {
        return this.score;
    }
    getLatency() {
        return this.latency;
    }
}
exports.Metric = Metric;
