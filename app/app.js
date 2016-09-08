/*
-----------------------------------------------------------------------------------
|
| Imports
|
-----------------------------------------------------------------------------------
*/

import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import config from '../config';
import { asyncRequest } from './utils/helpers';
import { networkLogger, appLogger as logger } from './setup/logger';

/*
-----------------------------------------------------------------------------------
|
| Express application configuration
|
-----------------------------------------------------------------------------------
*/

const pathStaticFiles = config.paths.staticFiles;
const pathViews = config.paths.views;
const loggingSetting = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
const app = express();

app.set('view engine', 'pug');
app.set('views', pathViews);
app.use('/', express.static(pathStaticFiles));
app.use(bodyParser.json());
app.use(morgan(loggingSetting, { stream: networkLogger.stream }));

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
  logger.error('Error caught in Express middleware', err);
  res.sendStatus(500);
});

/*
-----------------------------------------------------------------------------------
|
| Exports
|
-----------------------------------------------------------------------------------
*/

export default app;
