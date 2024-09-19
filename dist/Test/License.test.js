"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const License_1 = require("../Models/License");
describe('License', () => {
    it('should calculate the License score', () => {
        const license = new License_1.License('http://example.com');
        license.calculateScoreGithub();
        const score = license.getScore();
        (0, chai_1.expect)(score).to.equal(0.2);
    });
    it('should calculate the latency for License', () => {
        const license = new License_1.License('http://example.com');
        license.calculateScoreGithub();
        (0, chai_1.expect)(license.getLatency()).to.be.a('number');
    });
});
// add test case to check if the object is an instance of License
describe('License', () => {
    it('should be an instance of License', () => {
        const license = new License_1.License('http://example.com');
        (0, chai_1.expect)(license).to.be.an.instanceOf(License_1.License);
    });
});
