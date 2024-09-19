"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllMetrics = void 0;
const BusFactor_1 = require("./BusFactor");
const Correctness_1 = require("./Correctness");
const ResponsiveMaintainer_1 = require("./ResponsiveMaintainer");
const RampUp_1 = require("./RampUp");
const License_1 = require("./License");
class AllMetrics {
    constructor(url) {
        // make an array of all metrics
        this.metrics = [];
        this.netScore = 0;
        this.netScoreLatency = 0;
        this.metrics.push(new BusFactor_1.BusFactor(url));
        this.metrics.push(new Correctness_1.Correctness(url));
        this.metrics.push(new ResponsiveMaintainer_1.ResponsiveMaintainer(url));
        this.metrics.push(new RampUp_1.RampUp(url));
        this.metrics.push(new License_1.License(url));
        //check if url is npm url or github url
        if (this.checkUrlType(url) === 'npm') {
            this.metrics.forEach(metric => {
                metric.calculateScoreNPM();
            });
        }
        else {
            this.metrics.forEach(metric => {
                metric.calculateScoreGithub();
            });
        }
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
    checkUrlType(url) {
        const npmRegex = /^(https?:\/\/)?(www\.)?npmjs\.com/i;
        const githubRegex = /^(https?:\/\/)?(www\.)?github\.com/i;
        if (npmRegex.test(url)) {
            return 'npm';
        }
        else if (githubRegex.test(url)) {
            return 'github';
        }
        else {
            return 'unknown';
        }
    }
}
exports.AllMetrics = AllMetrics;
