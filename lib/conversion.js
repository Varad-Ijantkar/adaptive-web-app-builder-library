const fs = require('fs-extra');
const path = require('path');

// Backup the project
async function backupProject(projectPath) {
  const backupPath = `${projectPath}_backup`;
  try {
    await fs.copy(projectPath, backupPath);
    console.log(`Backup created at: ${backupPath}`);
  } catch (error) {
    console.error('Error creating backup:', error);
  }
}

// Check for non-compliant Angular components
function checkAngularComponents(projectPath) {
  const componentFiles = fs.readdirSync(path.join(projectPath, 'src', 'app'));
  const nonCompliantComponents = [];

  componentFiles.forEach((file) => {
    const componentPath = path.join(projectPath, 'src', 'app', file);
    const content = fs.readFileSync(componentPath, 'utf8');
    if (!content.includes('flourish-navbar') || !content.includes('flourish-styles')) {
      nonCompliantComponents.push(file);
    }
  });

  return nonCompliantComponents;
}

// Check for non-compliant React components
function checkReactComponents(projectPath) {
  const componentFiles = fs.readdirSync(path.join(projectPath, 'src', 'components'));
  const nonCompliantComponents = [];

  componentFiles.forEach((file) => {
    const componentPath = path.join(projectPath, 'src', 'components', file);
    const content = fs.readFileSync(componentPath, 'utf8');
    if (!content.includes('FlourishNavbar') || !content.includes('FlourishStyles')) {
      nonCompliantComponents.push(file);
    }
  });

  return nonCompliantComponents;
}

// Check for non-compliant React Native components
function checkReactNativeComponents(projectPath) {
  const componentFiles = fs.readdirSync(path.join(projectPath, 'src', 'components'));
  const nonCompliantComponents = [];

  componentFiles.forEach((file) => {
    const componentPath = path.join(projectPath, 'src', 'components', file);
    const content = fs.readFileSync(componentPath, 'utf8');
    if (!content.includes('FlourishNavbar') || !content.includes('FlourishStyles')) {
      nonCompliantComponents.push(file);
    }
  });

  return nonCompliantComponents;
}

// Convert non-compliant components to Flourish standards
async function convertToFlourish(projectPath, framework) {
  let templateDir;

  if (framework === 'angular') {
    templateDir = path.join(__dirname, '../templates/angular-project/src/app');
  } else if (framework === 'react') {
    templateDir = path.join(__dirname, '../templates/react-project/src/components');
  } else if (framework === 'react-native') {
    templateDir = path.join(__dirname, '../templates/react-native-project/src/components');
  }

  const components = ['footer', 'headbar', 'navbar', 'homepage', 'navmenu'];
  const componentDir = framework === 'angular'
    ? path.join(projectPath, 'src/app')
    : path.join(projectPath, 'src/components');

  for (const component of components) {
    const componentPath = path.join(componentDir, component);

    // Check if component exists, if it does, replace it; otherwise, copy new one
    if (fs.existsSync(componentPath)) {
      console.log(`Replacing existing ${component} with Flourish-compliant version.`);
    } else {
      console.log(`Component ${component} is missing. Adding Flourish-compliant version.`);
    }

    await fs.copy(path.join(templateDir, component), componentPath, { overwrite: true });
  }

  console.log(`${framework} components have been converted to Flourish standards.`);
}

// Main conversion function
async function convertProject(framework, projectPath) {
  try {
    // Backup the project first
    await backupProject(projectPath);

    let nonCompliantComponents = [];

    if (framework === 'angular') {
      nonCompliantComponents = checkAngularComponents(projectPath);
    } else if (framework === 'react') {
      nonCompliantComponents = checkReactComponents(projectPath);
    } else if (framework === 'react-native') {
      nonCompliantComponents = checkReactNativeComponents(projectPath);
    }

    if (nonCompliantComponents.length > 0) {
      console.log(`Non-compliant components found: ${nonCompliantComponents.join(', ')}`);
      await convertToFlourish(projectPath, framework);
    } else {
      console.log(`All components are already Flourish-compliant for ${framework}.`);
    }
  } catch (error) {
    console.error('Error during conversion:', error);
  }
}

module.exports = convertProject;
