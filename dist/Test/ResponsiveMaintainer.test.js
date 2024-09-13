"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const ResponsiveMaintainer_1 = require("../Models/ResponsiveMaintainer");
describe('ResponsiveMaintainer', () => {
    it('should calculate the ResponsiveMaintainer score', () => {
        const responsiveMaintainer = new ResponsiveMaintainer_1.ResponsiveMaintainer('http://example.com');
        responsiveMaintainer.calculateScore();
        (0, chai_1.expect)(responsiveMaintainer.getScore()).to.equal(0.10);
    });
    it('should calculate the latency for ResponsiveMaintainer', () => {
        const responsiveMaintainer = new ResponsiveMaintainer_1.ResponsiveMaintainer('http://example.com');
        responsiveMaintainer.calculateScore();
        (0, chai_1.expect)(responsiveMaintainer.getLatency()).to.be.a('number');
    });
});
// add test case to check if the object is an instance of ResponsiveMaintainer
describe('ResponsiveMaintainer', () => {
    it('should be an instance of ResponsiveMaintainer', () => {
        const responsiveMaintainer = new ResponsiveMaintainer_1.ResponsiveMaintainer('http://example.com');
        (0, chai_1.expect)(responsiveMaintainer).to.be.an.instanceOf(ResponsiveMaintainer_1.ResponsiveMaintainer);
    });
});
