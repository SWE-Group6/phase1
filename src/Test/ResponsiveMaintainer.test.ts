import { expect } from 'chai';
import { ResponsiveMaintainer } from '../Models/ResponsiveMaintainer';

describe('ResponsiveMaintainer', () => {
  it('should calculate the ResponsiveMaintainer score', async () => {
    const responsiveMaintainer = new ResponsiveMaintainer('https://github.com/cloudinary/cloudinary_npm');
    await responsiveMaintainer.calculateScoreGithub();
    expect(responsiveMaintainer.getScore()).to.be.within(0, 1);
  });

  it('should calculate the latency for ResponsiveMaintainer', async () => {
    const responsiveMaintainer = new ResponsiveMaintainer('https://github.com/cloudinary/cloudinary_npm');
    await responsiveMaintainer.calculateScoreGithub();
    expect(responsiveMaintainer.getLatency()).to.be.a('number');
  });

  it('should be an instance of ResponsiveMaintainer', () => {
    const responsiveMaintainer = new ResponsiveMaintainer('https://github.com/cloudinary/cloudinary_npm');
    expect(responsiveMaintainer).to.be.an.instanceOf(ResponsiveMaintainer);
  });
});
