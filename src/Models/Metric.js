"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metric = void 0;
var Metric = /** @class */ (function () {
    function Metric(url, version) {
        this.score = 0;
        this.latency = 0;
        this.url = url;
        this.version = version;
    }
    Metric.prototype.getScore = function () {
        return this.score;
    };
    Metric.prototype.getLatency = function () {
        return this.latency;
    };
    return Metric;
}());
exports.Metric = Metric;
