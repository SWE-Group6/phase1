const fs = require('fs');
const path = require('path');

class CustomTestReporter {
    onRunComplete(_, results) {
        const total = results.numTotalTests;
        const passed = results.numPassedTests;

        // Construct the absolute path to coverage-summary.json relative to the project root
        const coverageSummaryPath = path.resolve(process.cwd(), 'coverage', 'coverage-summary.json');
        
        console.log('Attempting to read coverage from:', coverageSummaryPath);

        // Check if the coverage-summary.json file exists
        if (fs.existsSync(coverageSummaryPath)) {
            const coverageSummaryJson = JSON.parse(fs.readFileSync(coverageSummaryPath, 'utf8'));
            
            // Extract total and covered lines from the coverage summary
            const totalLines = coverageSummaryJson.total.lines.total;
            const coveredLines = coverageSummaryJson.total.lines.covered;

            // Calculate the coverage percentage
            const coveragePercentage = ((coveredLines / totalLines) * 100).toFixed(2);
            
            console.log(`Total: ${total}`);
            console.log(`Passed: ${passed}`);
            console.log(`Coverage: ${coveragePercentage}%`);
            console.log(`${passed}/${total} test cases passed. ${coveragePercentage}% line coverage achieved.`);
        } else {
            console.error('Error: coverage-summary.json file not found. Ensure coverage is generated.');
        }
    }
}

module.exports = CustomTestReporter;
