const inquirer = require('inquirer');
const chalk = require('chalk');
const type = require('./database/type');
const raml = require('./raml/raml');

module.exports.questions = [
  {
    name: 'input',
    type: 'list',
    message: 'From where should we read the schema?',
    choices: ['Existing Database', 'RAML specification'],
  },
];

module.exports.handler = (data) => {
  switch (data.input) {
    case 'Existing Database':
      return inquirer.prompt(type.questions).then(type.handler);
    case 'RAML specification':
      return inquirer.prompt(raml.questions).then(raml.handler);
    default: {
      console.log(chalk.yellow('Input source not supported yet.'));
    }
  }

  return Promise.reject(undefined);
};
