"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const Correctness_1 = require("../Models/Correctness");
describe('Correctness', () => {
    it('should calculate the Correctness score', () => {
        const correctness = new Correctness_1.Correctness('http://example.com');
        correctness.calculateScoreGithub();
        (0, chai_1.expect)(correctness.getScore()).to.equal(0.1);
    });
    it('should calculate the latency for Correctness', () => {
        const correctness = new Correctness_1.Correctness('http://example.com');
        correctness.calculateScoreGithub();
        (0, chai_1.expect)(correctness.getLatency()).to.be.a('number');
    });
});
// add test case to check if the object is an instance of Correctness
describe('Correctness', () => {
    it('should be an instance of Correctness', () => {
        const correctness = new Correctness_1.Correctness('http://example.com');
        (0, chai_1.expect)(correctness).to.be.an.instanceOf(Correctness_1.Correctness);
    });
});
