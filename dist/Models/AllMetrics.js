"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllMetrics = void 0;
const BusFactor_1 = require("./BusFactor");
const Correctness_1 = require("./Correctness");
const ResponsiveMaintainer_1 = require("./ResponsiveMaintainer");
const RampUp_1 = require("./RampUp");
const License_1 = require("./License");
class AllMetrics {
    constructor(url, version) {
        // make an array of all metrics
        this.metrics = [];
        this.netScore = 0;
        this.netScoreLatency = 0;
        this.metrics.push(new BusFactor_1.BusFactor(url, version));
        this.metrics.push(new Correctness_1.Correctness(url, version));
        this.metrics.push(new ResponsiveMaintainer_1.ResponsiveMaintainer(url, version));
        this.metrics.push(new RampUp_1.RampUp(url, version));
        this.metrics.push(new License_1.License(url, version));
        this.metrics.forEach(metric => {
            metric.calculateScore(url, version);
        });
    }
    calculateNetScore() {
        const start = performance.now();
        this.metrics.forEach(metric => {
            //print the class name and the details to console.log by typecasting in to the concrete class
            console.log(metric.constructor.name);
            console.log("Score: " + metric.getScore());
            console.log("Weight: " + metric.weight);
            this.netScore += metric.getScore() * metric.weight;
        });
        const end = performance.now();
        this.netScoreLatency = end - start;
        return this.netScore;
    }
    getNetScoreLatency() {
        return this.netScoreLatency;
    }
    getNetScore() {
        return this.netScore;
    }
}
exports.AllMetrics = AllMetrics;
