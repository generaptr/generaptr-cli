const inquirer = require('inquirer');
const chalk = require('chalk');
const dialect = require('./relational/dialect');

module.exports.questions = [
  {
    name: 'type',
    type: 'list',
    message: 'What type of database are we dealing with?',
    choices: ['relational', 'non-relational'],
  },
];

module.exports.handler = (data) => {
  switch (data.type) {
    case 'relational':
      return inquirer.prompt(dialect.questions).then(dialect.handler);
    default: {
      console.log(chalk.yellow('Non-relational databases not supported yet.'));
    }
  }

  return Promise.reject(undefined);
};
