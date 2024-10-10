const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');

async function createReactNativeProject(projectName) {
  const TEMPLATE_DIR = path.join(__dirname, '../templates/react-native-project');
  const PROJECT_DIR = path.join(process.cwd(), projectName);

  console.log(`Creating React Native project "${projectName}"...`);

  // Remove the existing project directory if it exists
  if (fs.existsSync(PROJECT_DIR)) {
    console.log('Removing existing project directory...');
    await fs.remove(PROJECT_DIR);
  }

  // Copy template files to the new project directory
  console.log('Copying template files...');
  await fs.copy(TEMPLATE_DIR, PROJECT_DIR);

  // Run npm install to install dependencies
  console.log('Installing dependencies...');
  await new Promise((resolve, reject) => {
    exec('npm install', { cwd: PROJECT_DIR }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error installing dependencies: ${stderr}`);
        reject(error);
      } else {
        console.log(stdout);
        resolve();
      }
    });
  });

  console.log(`React Native project "${projectName}" created successfully.`);
}

module.exports = { createReactNativeProject };
