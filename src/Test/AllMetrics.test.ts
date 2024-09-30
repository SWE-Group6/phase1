import { expect } from 'chai';
import { AllMetrics } from '../Models/AllMetrics';

describe('AllMetrics', () => {
  let allMetrics: AllMetrics;

  beforeEach(() => {
    allMetrics = new AllMetrics('https://github.com/cloudinary/cloudinary_npm');
  });

  it('should initialize all metrics', () => {
    expect(allMetrics.metrics.length).to.equal(5);
  });

  it('should be an instance of AllMetrics', () => {
    expect(allMetrics).to.be.an.instanceOf(AllMetrics);
  });
});
