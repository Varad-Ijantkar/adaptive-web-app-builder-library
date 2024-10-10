const fs = require('fs-extra');
const path = require('path');

async function convertReactProject(projectPath) {
  console.log(`Converting React project at ${projectPath} to Flourish standards...`);

  // Components to check
  const components = ['homepage', 'navbar', 'sidebar'];
  const componentDir = path.join(projectPath, 'src', 'components');
  const templateDir = path.join(__dirname, '../templates/react-project/src/components');

  for (const component of components) {
    const componentPath = path.join(componentDir, component);
    if (!fs.existsSync(componentPath) || fs.readdirSync(componentPath).length === 0) {
      console.log(`Component ${component} is missing or empty. Adding ${component}...`);
      await fs.copy(path.join(templateDir, component), componentPath);
    } else {
      console.log(`Component ${component} is present. Replacing it...`);
      await fs.copy(path.join(templateDir, component), componentPath, { overwrite: true });
    }
  }

  console.log('Conversion of React project completed.');
}

module.exports = { convertReactProject };
