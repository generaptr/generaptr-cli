const inquirer = require('inquirer');
const chalk = require('chalk');
const mysql = require('./mysql');

module.exports.questions = [
  {
    name: 'dialect',
    type: 'list',
    message: 'Database engine:',
    choices: ['MySql', 'Postgresql', 'Sqlite'],
  },
];

module.exports.handler = (data) => {
  switch (data.dialect) {
    case 'MySql': {
      return inquirer.prompt(mysql.questions).then(mysql.handler);
    }
    default: {
      console.log(chalk.yellow(`${data.dialect} not yet supported.`));
    }
  }

  return Promise.reject(undefined);
};
