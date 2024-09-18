import { expect } from 'chai';
import { BusFactor } from '../Models/BusFactor';

describe('BusFactor', () => {
  it('should calculate the BusFactor score', () => {
    const busFactor = new BusFactor('http://example.com');
    busFactor.calculateScoreGithub();
    expect(busFactor.getScore()).to.equal(0.16);
  });

  it('should calculate the latency for BusFactor', () => {
    const busFactor = new BusFactor('http://example.com');
    busFactor.calculateScoreGithub();
    expect(busFactor.getLatency()).to.be.a('number');
  });
});

// add test case to check if the object is an instance of BusFactor
describe('BusFactor', () => {
  it('should be an instance of BusFactor', () => {
    const busFactor = new BusFactor('http://example.com');
    expect(busFactor).to.be.an.instanceOf(BusFactor);
  });
});
