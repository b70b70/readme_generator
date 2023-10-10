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
      name: 'Installation',
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
        name: 'questions',
        message: 'Provide information on how users or contributors can reach out with questions or feedback. You can include contact information or direct them to an issue tracker or forum.',
      },

  ]);

  //Define a function named generateREADME that takes the answers object as a parameter and constructs a README.md file content as a string
const generateREADME = (answers) =>
  ` ## ${answers.name} 
  - ${answers.description}
  - ${answers.installation} 
  - ${answers.usage} 
  # ${answers.license}
    ${answers.contributing}
    ${answers.tests}
    ${answers.questions}`;

promptUser()
  // write the generated README content to a file named 'README.md' using the writeFileAsync function
  .then((answers) => writeFileAsync('README.md', generateREADME(answers)))
  // If the file write is successful, log a success message to the console.
  .then(() => console.log('Successfully wrote to README.MD'))
  // If there's an error at any point, catch the error and log it to the console.
  .catch((err) => console.error(err));
