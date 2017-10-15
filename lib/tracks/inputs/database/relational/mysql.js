const chalk = require('chalk');
const handlers = require('generaptr').handlers;

module.exports.questions = [
  {
    name: 'host',
    type: 'input',
    message: 'Host:',
    default: '127.0.0.1',
  },
  {
    name: 'port',
    type: 'input',
    message: 'Port:',
    default: '3306',
    validate: (value)  => {
      if (!isNaN(parseInt(value))) {
        return true;
      }

      console.log(chalk.red('Port must be a number'));

      return false;
    },
  },
  {
    name: 'database',
    type: 'input',
    message: 'Database:',
    validate: (value) => {
      if (value.length) {
        return true;
      }

      console.log(chalk.red('Database not provided'));

      return false;
    },
  },
  {
    name: 'user',
    type: 'input',
    message: 'User (needs read access to information_schema):',
    default: 'root',
  },
  {
    name: 'password',
    type: 'password',
    message: 'Password:',
    default: '',
  },
];

module.exports.handler = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const sqlHandler = new handlers.MySql(data);
      sqlHandler.connect();

      sqlHandler.readSchema()
        .then((schema) => {
          resolve(schema);
          sqlHandler.close();
        })
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};
