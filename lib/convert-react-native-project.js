const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');

// Function to install dependencies if required
async function installDependencies(projectPath) {
  return new Promise((resolve, reject) => {
    exec('npm install', { cwd: projectPath }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error installing dependencies: ${error.message}`);
        return reject(error);
      }
      console.log(`Dependencies installed successfully:\n${stdout}`);
      resolve();
    });
  });
}

// Function to convert React Native project
async function convertReactNativeProject(projectPath) {
  console.log(`Converting React Native project at ${projectPath} to Flourish standards...`);

  const templateDir = path.join(__dirname, '../templates/react-native-project');

  try {
    // Remove all files in the user's project directory except node_modules
    const filesToDelete = await fs.readdir(projectPath);
    for (const file of filesToDelete) {
      const filePath = path.join(projectPath, file);
      if (file !== 'node_modules') {
        await fs.remove(filePath);
      }
    }
    console.log('Compared all files in the user\'s project folder, keeping node_modules.');

    // Copy the entire template project to the user's project directory
    await fs.copy(templateDir, projectPath);
    console.log('Copied Flourish-compliant project from templates to user\'s folder.');

    // Install dependencies if needed
    await installDependencies(projectPath);

    console.log('Conversion of React Native project to Flourish standards completed.');
  } catch (error) {
    console.error('Error during React Native project conversion:', error);
  }
}

module.exports = { convertReactNativeProject };
