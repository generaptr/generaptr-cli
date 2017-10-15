const chalk = require('chalk');
const inquirer = require('inquirer');
const specification = require('./outputs/specification');
const boilerplate = require('./outputs/boilerplate');

module.exports.questions = [
  {
    name: 'action',
    type: 'list',
    message: 'What would you want to generate?',
    choices: ['Boilerplate API', 'RAML Specification'],
  },
];

module.exports.handler = (data) => {
  switch (data.action) {
    case 'RAML Specification': {
      return inquirer.prompt(specification.questions).then(specification.handler);
    }
    case 'Boilerplate API': {
      return inquirer.prompt(boilerplate.questions).then(boilerplate.handler);
    }
    default: {
      console.log(chalk.yellow(`${data.action} not yet supported.`));
    }
  }

  return Promise.reject(undefined);
};
