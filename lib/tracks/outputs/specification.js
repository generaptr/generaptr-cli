const chalk = require('chalk');
const inquirer = require('inquirer');
const operations = require('generaptr').operations;
const type = require('../inputs/database/type');

module.exports.questions = [
  {
    name: 'output',
    type: 'input',
    message: 'RAML specification output directory:',
    default: 'raml',
  },
  {
    name: 'name',
    type: 'input',
    message: 'Application name:',
  },
  {
    name: 'version',
    type: 'input',
    message: 'Version:',
  },
  {
    name: 'url',
    type: 'input',
    message: 'Base URL:',
  },
];

module.exports.handler = (data) => {
  const raml = new operations.raml(data.output);
  let schemaInfo;

  return raml.createDirectoryStructure()
    .then(() => inquirer.prompt(type.questions).then(type.handler))
    .then((schema) => {
      schemaInfo = schema;

      return raml.generateSchemaTypeFiles(schemaInfo);
    })
    .then(() => raml.generateSchemaTypeFiles(schemaInfo))
    .then(() => raml.generateSchemaExampleFiles(schemaInfo))
    .then(() => raml.generateSchemaExamplesFilesFromCache())
    .then(() => raml.generateSchemaApiFiles(schemaInfo, data))
    .then(() => {
      console.log(chalk.green(`RAML Specification has been generated in: ${data.output}`));

      return Promise.resolve(true);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};
