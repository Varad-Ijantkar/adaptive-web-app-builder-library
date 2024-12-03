// #!/usr/bin/env node

// const { Command } = require("commander");
// const inquirer = require("inquirer");
// const { createAngularProject } = require("../lib/create-angular-project");
// const { createReactProject } = require("../lib/create-react-project");
// const { createReactNativeProject } = require("../lib/create-react-native-project");
// // const { generateAngularCompatibilityReport } = require("../lib/compatibility-report");
// const { convertAngularProject } = require("../lib/convert-angular-project");
// const { convertReactProject } = require("../lib/convert-react-project");
// const { convertReactNativeProject } = require("../lib/convert-react-native-project");

// const program = new Command();

// program.version("1.0.0").description("Adaptive Web App Builder CLI");

// // Command to create a new project
// program
//   .command("create")
//   .description("Create a new project")
//   .action(async () => {
//     const prompt = inquirer.createPromptModule();
//     const { framework, projectName } = await prompt([
//       {
//         type: "list",
//         name: "framework",
//         message: "Which framework would you like to use?",
//         choices: ["Angular", "React", "React Native"],
//       },
//       {
//         type: "input",
//         name: "projectName",
//         message: "Enter the project name or path:",
//         validate: (input) => (input ? true : "Project name/path cannot be empty."),
//       },
//     ]);

//     switch (framework) {
//       case "Angular":
//         await createAngularProject(projectName);
//         break;
//       case "React":
//         await createReactProject(projectName);
//         break;
//       case "React Native":
//         await createReactNativeProject(projectName);
//         break;
//       default:
//         console.log("Invalid framework selected.");
//     }
//   });

// // Command to convert an existing project
// program
//   .command("convert")
//   .description("Convert an existing project to Flourish standards")
//   .action(async () => {
//     const prompt = inquirer.createPromptModule();
//     const { framework, projectName } = await prompt([
//       {
//         type: "list",
//         name: "framework",
//         message: "Which framework is the project using?",
//         choices: ["Angular", "React", "React Native"],
//       },
//       {
//         type: "input",
//         name: "projectName",
//         message: "Enter the project name or path:",
//         validate: (input) => (input ? true : "Project name/path cannot be empty."),
//       },
//     ]);

//     switch (framework) {
//       case "Angular":
//         await convertAngularProject(projectName);
//         break;
//       case "React":
//         await convertReactProject(projectName);
//         break;
//       case "React Native":
//         await convertReactNativeProject(projectName);
//         break;
//       default:
//         console.log("Invalid framework selected.");
//     }
//   });

// // Command to generate a compatibility report
// program
//   .command("report")
//   .description("Generate a compatibility report for the project")
//   .action(async () => {
//     const prompt = inquirer.createPromptModule();
//     const { framework, projectName } = await prompt([
//       {
//         type: "list",
//         name: "framework",
//         message: "Which framework is the project using?",
//         choices: ["Angular", "React", "React Native"],
//       },
//       {
//         type: "input",
//         name: "projectName",
//         message: "Enter the project name or path:",
//         validate: (input) => (input ? true : "Project name/path cannot be empty."),
//       },
//     ]);

//     switch (framework) {
//       case "Angular":
//         await generateAngularCompatibilityReport(projectName);
//         break;
//       case "React":
//         console.log("Compatibility report for React is under development.");
//         break;
//       case "React Native":
//         console.log("Compatibility report for React Native is under development.");
//         break;
//       default:
//         console.log("Invalid framework selected.");
//     }
//   });

// program.parse(process.argv);

const { Command } = require("commander");
const inquirer = require("inquirer");
const { createAngularProject } = require("../lib/create-angular-project");
const { createReactProject } = require("../lib/create-react-project");
const { createReactNativeProject } = require("../lib/create-react-native-project");
const { generateAngularCompatibilityReport } = require("../lib/generate-angular-compatibility-report");
const { convertAngularProject } = require("../lib/convert-angular-project");
const { convertReactProject } = require("../lib/convert-react-project");
const { convertReactNativeProject } = require("../lib/convert-react-native-project");
const { applyColorPalette } = require("../lib/apply-color-palette");

const program = new Command();

program.version("1.0.3").description("Adaptive Web App Builder CLI");

// Command to create a new project
program
  .command("create")
  .description("Create a new project")
  .action(async () => {
    const prompt = inquirer.createPromptModule();
    const { framework, projectName } = await prompt([
      {
        type: "list",
        name: "framework",
        message: "Which framework would you like to use?",
        choices: ["Angular", "React", "React Native"],
      },
      {
        type: "input",
        name: "projectName",
        message: "Enter the project name or path:",
        validate: (input) => (input ? true : "Project name/path cannot be empty."),
      },
    ]);

    switch (framework) {
      case "Angular":
        await createAngularProject(projectName);
        break;
      case "React":
        const { colorPalette } = await prompt([
          {
            type: "list",
            name: "colorPalette",
            message: "Select a color palette for your project:",
            choices: ["Default", "Ocean", "Forest", "Sunset"],
          },
        ]);
        await createReactProject(projectName);
        await applyColorPalette(projectName, colorPalette);
        break;
      case "React Native":
        await createReactNativeProject(projectName);
        break;
      default:
        console.log("Invalid framework selected.");
    }
  });

// Command to convert an existing project
program
  .command("convert")
  .description("Convert an existing project to Flourish standards")
  .action(async () => {
    const prompt = inquirer.createPromptModule();
    const { framework, projectName } = await prompt([
      {
        type: "list",
        name: "framework",
        message: "Which framework is the project using?",
        choices: ["Angular", "React", "React Native"],
      },
      {
        type: "input",
        name: "projectName",
        message: "Enter the project name or path:",
        validate: (input) => (input ? true : "Project name/path cannot be empty."),
      },
    ]);

    switch (framework) {
      case "Angular":
        await convertAngularProject(projectName);
        break;
      case "React":
        await convertReactProject(projectName);
        break;
      case "React Native":
        await convertReactNativeProject(projectName);
        break;
      default:
        console.log("Invalid framework selected.");
    }
  });

// Command to generate a compatibility report
program
  .command("report")
  .description("Generate a compatibility report for the project")
  .action(async () => {
    const prompt = inquirer.createPromptModule();
    const { framework, projectName } = await prompt([
      {
        type: "list",
        name: "framework",
        message: "Which framework is the project using?",
        choices: ["Angular", "React", "React Native"],
      },
      {
        type: "input",
        name: "projectName",
        message: "Enter the project name or path:",
        validate: (input) => (input ? true : "Project name/path cannot be empty."),
      },
    ]);

    switch (framework) {
      case "Angular":
        await generateAngularCompatibilityReport(projectName);
        break;
      case "React":
        console.log("Compatibility report for React is under development.");
        break;
      case "React Native":
        console.log("Compatibility report for React Native is under development.");
        break;
      default:
        console.log("Invalid framework selected.");
    }
  });

program.parse(process.argv);
