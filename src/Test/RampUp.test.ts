import { expect } from 'chai';
import { RampUp } from '../Models/RampUp';

describe('RampUp', () => {
  it('should calculate the RampUp score', () => {
    const rampUp = new RampUp('http://example.com');
    rampUp.calculateScore();
    expect(rampUp.getScore()).to.equal(0.5);
  });

  it('should calculate the latency for RampUp', () => {
    const rampUp = new RampUp('http://example.com');
    rampUp.calculateScore();
    expect(rampUp.getLatency()).to.be.a('number');
  });
});

// add test case to check if the object is an instance of RampUp
describe('RampUp', () => {
  it('should be an instance of RampUp', () => {
    const rampUp = new RampUp('http://example.com');
    expect(rampUp).to.be.an.instanceOf(RampUp);
  });
});
