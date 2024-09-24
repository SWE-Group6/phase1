import { expect } from 'chai';
import { Correctness } from '../Models/Correctness';

describe('Correctness', () => {
  let correctness: Correctness;

  beforeEach(() => {
    correctness = new Correctness('http://example.com');
  });

  it('should calculate the GitHub Correctness score', async () => {
    await correctness.calculateScoreGithub();
    expect(correctness.getGitHubScore()).to.be.closeTo(0.06, 0.001);
  });

  it('should calculate the NPM Correctness score', async () => {
    await correctness.calculateScoreNPM();
    expect(correctness.getNpmScore()).to.be.closeTo(0, 0.001); 
  });

  it('should calculate the final combined correctness score', async () => {
    await correctness.calculateScore();
    expect(correctness.getScore()).to.be.closeTo(0.06, 0.001);
  });

  it('should be an instance of Correctness', () => {
    expect(correctness).to.be.an.instanceOf(Correctness);
  });
});
