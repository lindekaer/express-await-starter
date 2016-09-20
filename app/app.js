/*
-----------------------------------------------------------------------------------
|
| Imports
|
-----------------------------------------------------------------------------------
*/

import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import { asyncRequest } from './utils/helpers';
import { networkLogger, appLogger as logger } from './setup/logger';
import config from '../config';

/*
-----------------------------------------------------------------------------------
|
| Express application configuration
|
-----------------------------------------------------------------------------------
*/

const app = express();

// The title of the application
app.set('title', config.name);

// Remove the 'powered by Express'
app.set('x-powered-by', null);

// Set application in appropriate mode
app.set('env', process.env.NODE_ENV);

// Now /foo is not equal to /foo/
app.set('strict routing', true);

// Now /Bar is not equal to /bar
app.set('case sensitive routing', true);

// JSON returned is indented with spaces
app.set('json spaces', 2);

// Render templates using Pug
app.set('view engine', 'pug');

// Specifiy path to templates
app.set('views', path.join(__dirname, 'views'));

// JSON is parsed and places in req.body
app.use(bodyParser.json());

// Compress response bodies
app.use(compression());

// Helps to secure the app with various HTTP headers
app.use(helmet());

// Mount a folder to host public, static files
app.use('/', express.static(path.join(__dirname, '..', 'public')));

// Log all incoming network requests
const loggingSetting = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(morgan(loggingSetting, { stream: networkLogger.stream }));

app.get('/', (req, res) => {
  res.render('index');
});

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
