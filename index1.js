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
      name: 'overview',
      message: 'Provide a brief overview of your project.',
    },
    {
      type: 'input',
      name: 'prerequisites',
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
        choices: ['MIT', 'Apache', 'GPL', 'EPL', 'roti']
      }

  ]);

  //Define a function named generateREADME that takes the answers object as a parameter and constructs a README.md file content as a string
const generateREADME = (answers) =>
  ` ## ${answers.name} 
  - ${answers.overview}
  - ${answers.prerequisites} 
  - ${answers.usage} 
  ## ${answers.license}`;

promptUser()
  // write the generated README content to a file named 'README.md' using the writeFileAsync function
  .then((answers) => writeFileAsync('README.md', generateREADME(answers)))
  // If the file write is successful, log a success message to the console.
  .then(() => console.log('Successfully wrote to README.MD'))
  // If there's an error at any point, catch the error and log it to the console.
  .catch((err) => console.error(err));
