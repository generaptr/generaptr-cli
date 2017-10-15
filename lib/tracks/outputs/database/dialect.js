const inquirer = require('inquirer');
const chalk = require('chalk');
const mysql = require('./mysql');

module.exports.questions = [
  {
    name: 'dialect',
    type: 'list',
    message: 'Database engine:',
    choices: ['MySql'],
  },
];

module.exports.handler = (data) => {
  switch (data.dialect) {
    case 'MySql': {
      return inquirer.prompt(mysql.questions)
        .then(mysql.handler)
        .then(
          (connection) => {
            Object.assign(connection, {dialect: data.dialect});
            
            return Promise.resolve(connection);
          }
        );
    }
    default: {
      console.log(chalk.yellow('Database type not supported yet.'));
    }
  }

  return Promise.reject(undefined);
};
