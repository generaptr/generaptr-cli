const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('inquirer');
const action = require('./tracks/action');

clear();
console.log(
  chalk.cyan(
    figlet.textSync('generaptr', {horizontalLayout: 'full'})
  )
);

inquirer.prompt(action.questions)
  .then(action.handler)
  .catch((exception) => {
    console.log(chalk.red(exception));
  });