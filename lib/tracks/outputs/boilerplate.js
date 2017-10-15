const chalk = require('chalk');
const inquirer = require('inquirer');
const operations = require('generaptr').operations;
const input = require('../inputs/input');
const dialect = require('./database/dialect');

module.exports.questions = [
  {
    name: 'output',
    type: 'input',
    message: 'Boilerplate API output directory:',
    default: 'api',
  },
  {
    name: 'name',
    type: 'input',
    message: 'Application name (lower case with dashes):',
  },
  {
    name: 'description',
    type: 'input',
    message: 'Application description:',
  },
  {
    name: 'version',
    type: 'input',
    message: 'Version:',
    default: '1.0.0',
  },
  {
    name: 'license',
    type: 'input',
    message: 'Licence:',
    default: 'ISC',
  },
  {
    name: 'author',
    type: 'input',
    message: 'Author:',
  },
];

module.exports.handler = (data) => {
  const api = new operations.api(data.output);
  let schema;
  let connection;

  return api.createDirectoryStructure()
    .then(() => inquirer.prompt(input.questions).then(input.handler))
    .then((parsedSchema) => {
      schema = parsedSchema;

      return inquirer.prompt(dialect.questions).then(dialect.handler);
    })
    .then((connectionData) => {
      connection = connectionData;

      return inquirer.prompt([{
        name: 'allow',
        type: 'confirm',
        message: chalk.yellow('Allow generaptr to install required packages:'),
      }]);
    })
    .then((consent) => {
      if (!consent.allow) {
        return Promise.reject('User did not agree that generaptr should install required packages');
      }

      return api.createPackageJson(data, connection.dialect);
    })
    .then(() => api.installDependencies(connection.dialect))
    .then(() => api.initializeORM(connection.dialect))
    .then(() => api.initializeConfig(connection, schema))
    .then(() => api.initializeCommons())
    .then(() => api.initializeModels(connection.dialect, schema))
    .then(() => api.initializeRepositories(connection.dialect, schema))
    .then(() => api.initializeServices(schema))
    .then(() => api.initializeControllers(schema))
    .then(() => Promise.resolve(true))
    .catch((error) => {
      return Promise.reject(error);
    });
};
