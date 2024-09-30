import { expect } from 'chai';
import { Correctness } from '../Models/Correctness';

describe('Correctness', () => {
  it('should calculate the Correctness score', async () => {
    const correctness = new Correctness('https://github.com/cloudinary/cloudinary_npm');
    await correctness.calculateScoreGithub();
    expect(correctness.getScore()).to.be.within(0, 1);
  });

  it('should calculate the latency for Correctness', async () => {
    const correctness = new Correctness('https://github.com/cloudinary/cloudinary_npm');
    await correctness.calculateScoreGithub();
    expect(correctness.getLatency()).to.be.a('number');
  });

  it('should be an instance of Correctness', () => {
    const correctness = new Correctness('https://github.com/cloudinary/cloudinary_npm');
    expect(correctness).to.be.an.instanceOf(Correctness);
  });
});
