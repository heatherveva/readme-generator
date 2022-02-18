//generate license TEXT within the body of the readme
function insertBadgeText(license) {
  let licenseText;
  console.log(license);

  switch (license) {
    case "APACHE 2.0":
      licenseText = "This application is covered under Apache 2.0.";
      break;

    case "GPL 3.0":
      licenseText =
        "This application is covered under GNU General Public License 3.0.";
      break;

    case "MIT":
      licenseText = "This application is covered under an MIT License.";
      break;

    case "BSD 3":
      licenseText = "This application is covered under an BSD 3 License.";
      break;

    case "None":
      licenseText = "";
      break;
  }

  return licenseText;
}

//generate a license badge when license is selected
function insertBadge(license) {
  let badge;

  switch (license) {
    case "APACHE 2.0":
      badge = `[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`;
      break;

    case "GPL 3.0":
      badge = `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`;
      break;

    case "MIT":
      badge = `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`;
      break;

    case "BSD 3":
      badge = `[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)`;
      break;

    case "None":
      badge = "";
      break;
  }

  return badge;
}

//required files
const fs = require("fs");
const inquirer = require("inquirer");

//prompts for the user before the README is created

inquirer
  .prompt([
    {
      name: "projectTitle",
      type: "input",
      message: "What is the title of the project?",
    },
    {
      name: "description",
      type: "input",
      message: "Please describe your project's expected function.",
    },
    {
      name: "installation",
      type: "input",
      message: "What are the steps required to install your project?",
    },
    {
      name: "usage",
      type: "input",
      message: "Provide instructions and examples for use.",
    },
    {
      name: "screenshotDescription",
      type: "input",
      message:
        "Please provide a brief description of your application screenshot.",
    },
    {
      name: "screenshotPath",
      type: "input",
      message: "Please provide the path to your application screenshot.",
      validate: function (input) {
        const valid = input.startsWith("./");
        return valid || "Please begin your path with ./";
      },
    },
    {
      name: "license",
      type: "list",
      message: "Please select the license you'd like to include.",
      choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"],
    },
    {
      name: "contributing",
      type: "input",
      message:
        "List your collaborators, if any, with links to their GitHub profiles.",
    },
    {
      name: "gitHubName",
      type: "input",
      message: "GitHub Link: ",
    },
    {
      name: "emailAddress",
      type: "input",
      message: "Email Address: ",
      validate: function (input) {
        const valid = input.includes("@");
        return valid || "Please enter a valid email";
      },
    },
    {
      name: "gitHubLink",
      type: "input",
      message: "Insert the link to your application's GitHub repository.",
    },
    {
      name: "applicationPage",
      type: "input",
      message: "Insert the link to your application's page.",
    },
  ])

  //answer to promise - what to do with the answers user provides
  .then((answers) => {
    const badge = insertBadge(answers.license);
    console.log(answers);
    const licenseText = insertBadgeText(answers.license);
    console.log("licenseText" + licenseText);
    const readMe = generateReadme(answers, badge, licenseText);

    fs.writeFile("readme.md", readMe, process.argv[2], (err) =>
      err ? console.error(err) : console.log("Success!")
    );
  });

const generateReadme = (
  {
    projectTitle,
    description,
    installation,
    usage,
    screenshotDescription,
    screenshotPath,
    contributing,
    gitHubName,
    emailAddress,
    gitHubLink,
    applicationPage,
  },
  badge,
  licenseText
) => {
  console.log(badge);
  return `# ${projectTitle}

${badge}

    ## Table of Contents

    - [Description](#description)
    - [Installation](#installation)
    - [Usage](#usage)
    - [Screenshot](#screenshot)
    - [License](#license) 
    - [Contributing](#contributing)
    - [Tests](#tests)
    - [Contact Me](#contactme)
    - [Links](#links)
  
    ## Description

${description}
    
    ## Installation

${installation}
    
    ## Usage

${usage}

    ### Screenshot

![${screenshotDescription}](${screenshotPath})
    
    ## License

${licenseText}
    
    ## Contributing

${contributing}
    
    ## Tests
    
    ## Contact Me

    GitHub: ${gitHubName}

    Email: ${emailAddress}

    ## Links

    Here is a link to the repository: ${gitHubLink}

    Here is the page: ${applicationPage}`;
};
