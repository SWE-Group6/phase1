import { expect } from 'chai';
import { Correctness } from '../Models/Correctness';

describe('Correctness', () => {
  it('should calculate the Correctness score', () => {
    const correctness = new Correctness('http://example.com');
    correctness.calculateScoreGithub();
    expect(correctness.getScore()).to.equal(0.1);
  });

  it('should calculate the latency for Correctness', () => {
    const correctness = new Correctness('http://example.com');
    correctness.calculateScoreGithub();
    expect(correctness.getLatency()).to.be.a('number');
  });
});

// add test case to check if the object is an instance of Correctness
describe('Correctness', () => {
  it('should be an instance of Correctness', () => {
    const correctness = new Correctness('http://example.com');
    expect(correctness).to.be.an.instanceOf(Correctness);
  });
});
