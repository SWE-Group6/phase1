import { expect } from 'chai';
import { AllMetrics } from '../Models/AllMetrics';

describe('AllMetrics', () => {
  it('should calculate the net score correctly', () => {
    const allMetrics = new AllMetrics('http://example.com');
    const netScore = allMetrics.calculateNetScore();
    expect(netScore).to.be.a('number');
    expect(netScore).to.be.greaterThan(0);
  });

  it('should return a net score latency', () => {
    const allMetrics = new AllMetrics('http://example.com');
    allMetrics.calculateNetScore();
    const latency = allMetrics.getNetScoreLatency();
    expect(latency).to.be.a('number');
    expect(latency).to.be.greaterThan(0);
  });

  it('should initialize all metrics', () => {
    const allMetrics = new AllMetrics('http://example.com');
    expect(allMetrics.metrics.length).to.equal(5);
  });
});

// add test case to check if the object is an instance of AllMetrics
describe('AllMetrics', () => {
  it('should be an instance of AllMetrics', () => {
    const allMetrics = new AllMetrics('http://example.com');
    expect(allMetrics).to.be.an.instanceOf(AllMetrics);
  });
});
