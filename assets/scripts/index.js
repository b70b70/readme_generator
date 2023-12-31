// Import necessary modules: inquirer, fs, and util
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

//Define a function named promptUser that uses inquirer.prompt to ask the user a series of questions and return their answers as an object.
const promptUser = () =>
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your projects name?',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a brief overview of your project.',
    },
    {
      type: 'input',
      name: 'installation',
      message: 'Name any softwares, libraries or dependencies that users need to have installed before they can use your project. ',
    },
    {
      type: 'input',
      name: 'usage',
      message: 'Provide instructions & steps on how to use your project',
    },
    {
        type: 'list',
        name: 'license',
        message: 'Specify the license',
        choices: ['MIT', 'Apache', 'GPL', 'EPL']
      },
      {
        type: 'input',
        name: 'contributing',
        message: 'Explain how others can contribute to your project. Include guidelines for submitting issues, feature requests, or pull requests.',
      },
      {
        type: 'input',
        name: 'tests',
        message: 'Describe how to run tests for your project and provide any relevant details about the testing process.',
      },
      {
        type: 'input',
        name: 'github',
        message: 'Provide your Github username so readers can contact you (link will be generated with your username)',
      },

  ]);

  //Define a function named generateREADME that takes the answers object as a parameter and constructs a README.md file content as a string
  const generateREADME = (answers) => {
    // Create a variable to store the license badge Markdown
    let licenseBadge = '';
  
    // Create a variable to store the license notice Markdown
    let licenseNotice = '';
  
    // Determine the license badge and notice based on the user's choice
    switch (answers.license) {
      case 'MIT':
        licenseBadge = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
        licenseNotice = 'This application is licensed under the [MIT License](https://opensource.org/licenses/MIT).';
        break;
      case 'Apache':
        licenseBadge = '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
        licenseNotice = 'This application is licensed under the [Apache License 2.0](https://opensource.org/licenses/Apache-2.0).';
        break;
        case 'GPL':
          licenseBadge = '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)';
          licenseNotice = 'This application is licensed under the [GNU General Public License (GPL) v3](https://www.gnu.org/licenses/gpl-3.0).';
          break;
        case 'EPL':
          licenseBadge = '[![License: EPL 2.0](https://img.shields.io/badge/License-EPL%202.0-red.svg)](https://opensource.org/licenses/EPL-2.0)';
          licenseNotice = 'This application is licensed under the [Eclipse Public License (EPL) 2.0](https://opensource.org/licenses/EPL-2.0).';
          break;
        default:
          licenseBadge = '';
          licenseNotice = '';
          break;
    }

 // Ensure the GitHub username is provided and valid
 const githubUsername = answers.github ? answers.github.trim() : '';

 // Create a GitHub profile link if a valid GitHub username is provided
 const githubLink = githubUsername
   ? `[GitHub Profile](https://github.com/${githubUsername})`
   : '';

    // Generate the README content with the license badge and notice
    return `
  # ${answers.name}
  
  ${licenseBadge} <!-- License Badge -->

  ## Table of Contents
  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [Questions](#questions)
  
  ## Description
  ${answers.description}
  
  ## Installation
  ${answers.installation}
  
  ## Usage
  ${answers.usage}
  
  ## License
  ${licenseNotice} <!-- License Notice -->
  
  ## Contributing
  ${answers.contributing}
  
  ## Tests
  ${answers.tests}
  
  ## Questions
  - If you have any questions or feedback, please reach out to me through my (${githubLink}).
  `;
  };




promptUser()
  // write the generated README content to a file named 'README.md' using the writeFileAsync function
  .then((answers) => writeFileAsync('README.md', generateREADME(answers)))
  // If the file write is successful, log a success message to the console.
  .then(() => console.log('Successfully wrote to README.MD'))
  // If there's an error at any point, catch the error and log it to the console.
  .catch((err) => console.error(err));
