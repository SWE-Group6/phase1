"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const Metric_1 = require("../Models/Metric");
describe('Metric', () => {
    it('should have a score and latency initialized to 0', () => {
        class TestMetric extends Metric_1.Metric {
            constructor() {
                super(...arguments);
                this.weight = 0.5;
            }
            calculateScore() { }
        }
        const metric = new TestMetric('http://example.com');
        (0, chai_1.expect)(metric.getScore()).to.equal(0);
        (0, chai_1.expect)(metric.getLatency()).to.equal(0);
    });
});
// add test case to check if the object is an instance of Metric
describe('Metric', () => {
    it('should be an instance of Metric', () => {
        class TestMetric extends Metric_1.Metric {
            constructor() {
                super(...arguments);
                this.weight = 0.5;
            }
            calculateScore() { }
        }
        const metric = new TestMetric('http://example.com');
        (0, chai_1.expect)(metric).to.be.an.instanceOf(Metric_1.Metric);
    });
});
