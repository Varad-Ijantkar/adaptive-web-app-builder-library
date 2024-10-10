
const fs = require('fs-extra');
const path = require('path');

// Function to read all files from a directory recursively and filter by extension
async function getAllFiles(dirPath, extensions) {
  let files = [];
  const items = await fs.readdir(dirPath, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dirPath, item.name);
    if (item.isDirectory()) {
      // Recursively get files from the directory
      files = [...files, ...(await getAllFiles(fullPath, extensions))];
    } else if (item.isFile() && extensions.some(ext => item.name.endsWith(ext))) {
      // Only push files that match the allowed extensions
      files.push(fullPath);
    }
  }

  return files;
}

// Normalize component names based on a defined mapping
function normalizeComponentName(name) {
  const nameMapping = {
    'navbar': 'nav-bar',
    'nav-bar': 'nav-bar',
    'headbar': 'head-bar',
    'head-bar': 'head-bar',
    'homepage': 'home-page',
    'home-page': 'home-page',
    'footer': 'footer',
    'footer-component': 'footer',
    'sidebar': 'side-bar',
    'side-bar': 'side-bar',
    // Add more mappings as needed
  };
  
  // Replace each keyword in the name
  for (const key in nameMapping) {
    if (name.includes(key)) {
      name = name.replace(key, nameMapping[key]);
    }
  }

  return name;
}

// Compare all specified files in the project with the Flourished version
async function compareFiles(projectPath, flourishTemplatePath) {
  const results = [];

  // Extensions to include in the comparison (add more if needed)
  const extensions = ['.ts', '.html', '.css', '.scss', '.js'];

  // Get all files from project and Flourish template directories, recursively scanning component folders
  const projectFiles = await getAllFiles(`${projectPath}/src/app`, extensions);
  const flourishFiles = await getAllFiles(`${flourishTemplatePath}/src/app`, extensions);

  // Assume all components are compatible by default
  for (const projectFile of projectFiles) {
    let relativePath = path.relative(`${projectPath}/src/app`, projectFile); // Original relative path
    const flourishFileName = normalizeComponentName(relativePath.split(path.sep).pop());
    const flourishFile = path.join(flourishTemplatePath, 'src/app', flourishFileName); // Normalize filename

    if (flourishFiles.includes(flourishFile)) {
      results.push({ file: relativePath, status: 'compatible', differences: null });
    } else {
      console.warn(`⚠️ No matching Flourish component for ${relativePath}`);
      results.push({ file: relativePath, status: 'not-found-in-flourish', differences: null });
    }
  }

  // Log unmatched files from Flourish template (in case Flourish has components not present in the project)
  for (const flourishFile of flourishFiles) {
    const relativeFlourishPath = path.relative(`${flourishTemplatePath}/src/app`, flourishFile);
    if (!projectFiles.some(projectFile => {
      const normalizedName = normalizeComponentName(path.relative(`${projectPath}/src/app`, projectFile).split(path.sep).pop());
      return normalizedName === relativeFlourishPath.split(path.sep).pop();
    })) {
      console.warn(`⚠️ No matching Project component for ${relativeFlourishPath}`);
      results.push({ file: relativeFlourishPath, status: 'not-found-in-project', differences: null });
    }
  }
  
  return results;
}

module.exports = { compareFiles };
