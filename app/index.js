import express from 'express';
import bodyParser from 'body-parser';
import chalk from 'chalk';
import config from '../config';
import { asyncRequest } from './utils/helpers';

const port = process.env.PORT || config.port;
const mode = process.env.NODE_ENV || 'development';
const pathStaticFiles = config.path.staticFiles;
const pathViews = config.path.views;

const app = express();
app.listen(port, () => {
  console.log(`\n ⚡️ Server running in ${chalk.green(mode)} on port ${chalk.yellow(port)} ⚡️ \n`);
});

app.set('view engine', 'pug');
app.set('views', pathViews);
app.use('/', express.static(pathStaticFiles));
app.use(bodyParser.json());

app.get('/users', asyncRequest(async (req, res) => {
  const users = await fetchUsers();
  res.send(users);
}));

function fetchUsers() {
  // Function to be 'awaited' must return a promise
  return new Promise((resolve, reject) => {
    // Simulate async call to the database
    setTimeout(() => {
      return resolve([
        { username: 'Bob19', age: 19 },
        { username: 'LisaManning', age: 29 },
        { username: 'Bananonax', age: 31 },
        { username: 'Letty', age: 22 }
      ]);
    }, 2000);
  });
}

// Catch unhandled errors
app.use((err, req, res, next) => {
  console.log(err);
  res.send(500);
});

// Catch of exceptions
process.on('uncaughtException', err => console.log(err));
process.on('unhandledRejection', err => console.log(err));
