// custom-test-reporter.js
class CustomTestReporter {
    onRunComplete(_, results) {
      const total = results.numTotalTests;
      const passed = results.numPassedTests;
  
    // look in to the coverage/coverage-summary.json file
    // open the json file
    const coverageSummaryJson = require('./coverage/coverage-summary.json');
    // look into the total key, further look in to the lines key, then look into the total key, and store that as total lines
    const totalLines = coverageSummaryJson.total.lines.total;

    // look into the total key, further look in to the lines key, then look into the covered key, and store that as covered lines
    const coveredLines = coverageSummaryJson.total.lines.covered;

    // calculate the coverage percentage
    const coveragePercentage = parseInt(((coveredLines / totalLines) * 100).toFixed(2));

      
  
      console.log(`Total: ${total}`);
      console.log(`Passed: ${passed}`);
      console.log(`Coverage: ${coveragePercentage}%`);
      console.log(`${passed}/${total} test cases passed. ${coveragePercentage}% line coverage achieved.`);
    }
  }
  
  module.exports = CustomTestReporter;
  