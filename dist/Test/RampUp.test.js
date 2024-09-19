"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const RampUp_1 = require("../Models/RampUp");
describe('RampUp', () => {
    it('should calculate the RampUp score', () => {
        const rampUp = new RampUp_1.RampUp('http://example.com');
        rampUp.calculateScoreGithub();
        (0, chai_1.expect)(rampUp.getScore()).to.equal(0.5);
    });
    it('should calculate the latency for RampUp', () => {
        const rampUp = new RampUp_1.RampUp('http://example.com');
        rampUp.calculateScoreGithub();
        (0, chai_1.expect)(rampUp.getLatency()).to.be.a('number');
    });
});
// add test case to check if the object is an instance of RampUp
describe('RampUp', () => {
    it('should be an instance of RampUp', () => {
        const rampUp = new RampUp_1.RampUp('http://example.com');
        (0, chai_1.expect)(rampUp).to.be.an.instanceOf(RampUp_1.RampUp);
    });
});
