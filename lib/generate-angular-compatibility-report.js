const fs = require('fs');
const path = require('path');
const { compareFiles } = require('./utils/compare'); // Import from the external module

function generateReportContent(compatibilityResults) {
  let textReport = '🔍 **Compatibility Report** 🔍\n\n';
  let jsonReport = { report: [] };

  compatibilityResults.forEach(result => {
    const { file, status } = result;
    let statusText, statusIcon;

    switch (status) {
      case 'compatible':
        statusText = '✅ Compatible';
        statusIcon = '✅';
        break;
      case 'partially compatible':
        statusText = '⚠️ Partially Compatible';
        statusIcon = '⚠️';
        break;
      case 'non-compatible':
        statusText = '❌ Non-Compatible';
        statusIcon = '❌';
        break;
      default:
        statusText = '❓ Unknown Status';
        statusIcon = '❓';
    }

    textReport += `${statusIcon} ${file}: ${statusText}\n`;
    jsonReport.report.push({ file, status });
  });

  return { textReport, jsonReport };
}

function saveReportToFile(projectPath, textReport, jsonReport) {
  const reportDir = path.join(projectPath, 'report');
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir);
  }

  const textReportPath = path.join(reportDir, 'report.txt');
  const jsonReportPath = path.join(reportDir, 'report.json');

  fs.writeFileSync(textReportPath, textReport);
  fs.writeFileSync(jsonReportPath, JSON.stringify(jsonReport, null, 2));
}

async function generateAngularCompatibilityReport(projectName) {
  const projectPath = path.resolve(projectName);
  const flourishedPath = path.join(__dirname, '../templates/angular-standard-design-template');

  const compatibilityResults = await compareFiles(projectPath, flourishedPath);
  const { textReport, jsonReport } = generateReportContent(compatibilityResults);

  saveReportToFile(projectPath, textReport, jsonReport);

  console.log('🔍 Compatibility report generated successfully!');
  console.log(`📄 Report saved in: ${path.join(projectPath, 'report')}`);
}

module.exports = {
  generateAngularCompatibilityReport,
};
