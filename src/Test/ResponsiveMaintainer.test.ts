import { expect } from 'chai';
import { ResponsiveMaintainer } from '../Models/ResponsiveMaintainer';

describe('ResponsiveMaintainer', () => {
  it('should calculate the ResponsiveMaintainer score', () => {
    const responsiveMaintainer = new ResponsiveMaintainer('http://example.com');
    responsiveMaintainer.calculateScore();
    expect(responsiveMaintainer.getScore()).to.equal(0.10);
  });

  it('should calculate the latency for ResponsiveMaintainer', () => {
    const responsiveMaintainer = new ResponsiveMaintainer('http://example.com');
    responsiveMaintainer.calculateScore();
    expect(responsiveMaintainer.getLatency()).to.be.a('number');
  });
});

// add test case to check if the object is an instance of ResponsiveMaintainer
describe('ResponsiveMaintainer', () => {
  it('should be an instance of ResponsiveMaintainer', () => {
    const responsiveMaintainer = new ResponsiveMaintainer('http://example.com');
    expect(responsiveMaintainer).to.be.an.instanceOf(ResponsiveMaintainer);
  });
})