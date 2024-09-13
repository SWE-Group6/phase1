import { expect } from 'chai';
import { Metric } from '../Models/Metric';

describe('Metric', () => {
  it('should have a score and latency initialized to 0', () => {
    class TestMetric extends Metric {
      weight = 0.5;
      calculateScore() {}
    }
    const metric = new TestMetric('http://example.com');
    expect(metric.getScore()).to.equal(0);
    expect(metric.getLatency()).to.equal(0);
  });
});

// add test case to check if the object is an instance of Metric
describe('Metric', () => {
  it('should be an instance of Metric', () => {
    class TestMetric extends Metric {
      weight = 0.5;
      calculateScore() {}
    }
    const metric = new TestMetric('http://example.com');
    expect(metric).to.be.an.instanceOf(Metric);
  });
})