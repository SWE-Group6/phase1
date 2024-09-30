import { expect } from 'chai';
import { RampUp } from '../Models/RampUp';

describe('RampUp', () => {
  jest.setTimeout(30000);
  
  it('should calculate the RampUp score', async () => {
    const rampUp = new RampUp('https://github.com/cloudinary/cloudinary_npm');
    await rampUp.calculateScoreGithub();
    expect(rampUp.getScore()).to.be.within(0, 1);
  });

  it('should calculate the latency for RampUp', async () => {
    const rampUp = new RampUp('https://github.com/cloudinary/cloudinary_npm');
    await rampUp.calculateScoreGithub();
    expect(rampUp.getLatency()).to.be.a('number');
  });

  it('should be an instance of RampUp', () => {
    const rampUp = new RampUp('https://github.com/cloudinary/cloudinary_npm');
    expect(rampUp).to.be.an.instanceOf(RampUp);
  });
});
