const fs = require('fs');
const path = require('path');

// Palette definitions
const palettes = {
  Default: `
    :root {
      --homepage-background-color: #f0f0f0;
      --element-background-color: #ffffff;
      --element-text-color: #333;
      --button-background-color: #007bff;
      --button-hover-color: #0056b3;
      --sidebar-bg-color: #ffffff;
      --sidebar-text-color: #000000;
      --sidebar-hover-color: coral;
      --sidebar-border-color: #ddd;
      --navbar-bg-color: #ffffff;
      --navbar-text-color: #000000;
      --navbar-link-hover-color: coral;
      --navbar-border-color: #ddd;
    }
  `,
  Ocean: `
    :root {
      --homepage-background-color: #e0f7fa;
      --element-background-color: #ffffff;
      --element-text-color: #006064;
      --button-background-color: #0288d1;
      --button-hover-color: #01579b;
      --sidebar-bg-color: #e0f7fa;
      --sidebar-text-color: #004d40;
      --sidebar-hover-color: #00acc1;
      --sidebar-border-color: #b2ebf2;
      --navbar-bg-color: #e0f7fa;
      --navbar-text-color: #004d40;
      --navbar-link-hover-color: #00acc1;
      --navbar-border-color: #b2ebf2;
    }
  `,
  Forest: `
    :root {
      --homepage-background-color: #e8f5e9;
      --element-background-color: #ffffff;
      --element-text-color: #1b5e20;
      --button-background-color: #4caf50;
      --button-hover-color: #388e3c;
      --sidebar-bg-color: #e8f5e9;
      --sidebar-text-color: #2e7d32;
      --sidebar-hover-color: #66bb6a;
      --sidebar-border-color: #c8e6c9;
      --navbar-bg-color: #e8f5e9;
      --navbar-text-color: #2e7d32;
      --navbar-link-hover-color: #66bb6a;
      --navbar-border-color: #c8e6c9;
    }
  `,
  Sunset: `
    :root {
      --homepage-background-color: #fff3e0;
      --element-background-color: #ffffff;
      --element-text-color: #e65100;
      --button-background-color: #fb8c00;
      --button-hover-color: #ef6c00;
      --sidebar-bg-color: #fff3e0;
      --sidebar-text-color: #e64a19;
      --sidebar-hover-color: #ff7043;
      --sidebar-border-color: #ffe0b2;
      --navbar-bg-color: #fff3e0;
      --navbar-text-color: #e64a19;
      --navbar-link-hover-color: #ff7043;
      --navbar-border-color: #ffe0b2;
    }
  `,
};

// Function to apply the color palette
function applyColorPalette(projectName, paletteName) {
  const paletteCSS = palettes[paletteName];

  if (!paletteCSS) {
    console.error(`Color palette '${paletteName}' not found.`);
    return;
  }

  const cssFilePath = path.join(projectName, 'src', 'index.css'); // Adjust based on your folder structure

  fs.writeFileSync(cssFilePath, paletteCSS, 'utf8');
  console.log(`Applied ${paletteName} color palette to ${projectName}`);
}

module.exports = { applyColorPalette };
