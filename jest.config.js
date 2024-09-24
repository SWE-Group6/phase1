module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['json-summary','text', 'lcov'],
    reporters: ['default', './test-reporter.js'],
  };
  