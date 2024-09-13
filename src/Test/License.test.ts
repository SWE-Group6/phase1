import { expect } from 'chai';
import { License } from '../Models/License';

describe('License', () => {
  it('should calculate the License score', () => {
    const license = new License('http://example.com');
    license.calculateScore();
    const score = license.getScore();
    expect(score).to.equal(0.2);
  });

  it('should calculate the latency for License', () => {
    const license = new License('http://example.com');
    license.calculateScore();
    expect(license.getLatency()).to.be.a('number');
  });
});

// add test case to check if the object is an instance of License
describe('License', () => {
  it('should be an instance of License', () => {
    const license = new License('http://example.com');
    expect(license).to.be.an.instanceOf(License);
  });
})