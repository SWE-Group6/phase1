"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const BusFactor_1 = require("../Models/BusFactor");
describe('BusFactor', () => {
    it('should calculate the BusFactor score', () => {
        const busFactor = new BusFactor_1.BusFactor('http://example.com');
        busFactor.calculateScoreGithub();
        (0, chai_1.expect)(busFactor.getScore()).to.equal(0.16);
    });
    it('should calculate the latency for BusFactor', () => {
        const busFactor = new BusFactor_1.BusFactor('http://example.com');
        busFactor.calculateScoreGithub();
        (0, chai_1.expect)(busFactor.getLatency()).to.be.a('number');
    });
});
// add test case to check if the object is an instance of BusFactor
describe('BusFactor', () => {
    it('should be an instance of BusFactor', () => {
        const busFactor = new BusFactor_1.BusFactor('http://example.com');
        (0, chai_1.expect)(busFactor).to.be.an.instanceOf(BusFactor_1.BusFactor);
    });
});
