import { License } from '../Models/License';

describe('License', () => {
  // Increase the timeout for all tests in this suite
  jest.setTimeout(30000);

  it('should calculate the License score', async () => {
    const license = new License('https://github.com/cloudinary/cloudinary_npm');
    await license.calculateScoreGithub();
    expect(license.getScore()).toBeGreaterThanOrEqual(0);
    expect(license.getScore()).toBeLessThanOrEqual(1);
  });

  it('should calculate the latency for License', async () => {
    const license = new License('https://github.com/cloudinary/cloudinary_npm');
    await license.calculateScoreGithub();
    expect(typeof license.getLatency()).toBe('number');
  });

  it('should be an instance of License', () => {
    const license = new License('https://github.com/cloudinary/cloudinary_npm');
    expect(license).toBeInstanceOf(License);
  });

  // Clean up after all tests
  afterAll(async () => {
    // Add any necessary cleanup here
    // For example, if there are any open connections or timeouts, close them
  });
});