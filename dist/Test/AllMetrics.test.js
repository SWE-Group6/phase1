"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const AllMetrics_1 = require("../Models/AllMetrics");
describe('AllMetrics', () => {
    it('should calculate the net score correctly', () => {
        const allMetrics = new AllMetrics_1.AllMetrics('http://example.com');
        const netScore = allMetrics.calculateNetScore();
        (0, chai_1.expect)(netScore).to.be.a('number');
        (0, chai_1.expect)(netScore).to.be.greaterThan(0);
    });
    it('should return a net score latency', () => {
        const allMetrics = new AllMetrics_1.AllMetrics('http://example.com');
        allMetrics.calculateNetScore();
        const latency = allMetrics.getNetScoreLatency();
        (0, chai_1.expect)(latency).to.be.a('number');
        (0, chai_1.expect)(latency).to.be.greaterThan(0);
    });
    it('should initialize all metrics', () => {
        const allMetrics = new AllMetrics_1.AllMetrics('http://example.com');
        (0, chai_1.expect)(allMetrics.metrics.length).to.equal(5);
    });
});
// add test case to check if the object is an instance of AllMetrics
describe('AllMetrics', () => {
    it('should be an instance of AllMetrics', () => {
        const allMetrics = new AllMetrics_1.AllMetrics('http://example.com');
        (0, chai_1.expect)(allMetrics).to.be.an.instanceOf(AllMetrics_1.AllMetrics);
    });
});
