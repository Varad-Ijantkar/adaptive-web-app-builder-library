const fs = require('fs-extra');
const path = require('path');

async function convertAngularProject(projectPath) {
  console.log(`Converting Angular project at ${projectPath} to Flourish standards...`);

  const components = ['footer', 'headbar', 'navbar', 'homepage', 'navmenu'];
  const componentDir = path.join(projectPath, 'src/app');
  const templateDir = path.join(__dirname, '../templates/angular-project/src/app');

  for (const component of components) {
    const componentPath = path.join(componentDir, component);
    const templateComponentPath = path.join(templateDir, component);
    
    if (!fs.existsSync(componentPath)) {
      console.log(`Component ${component} is missing. Adding ${component}...`);
      await fs.copy(templateComponentPath, componentPath);
    } else {
      console.log(`Component ${component} found. Replacing with Flourish-compliant version...`);
      await fs.copy(templateComponentPath, componentPath, { overwrite: true });
    }
  }

  console.log('Conversion of Angular project completed.');
}

module.exports = { convertAngularProject };
