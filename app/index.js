import chalk from 'chalk';
import app from './app';
import config from '../config';
import { appLogger as logger } from './setup/logger';

const port = process.env.PORT || config.port;
const mode = process.env.NODE_ENV || 'development';

// Start application
app.listen(port, () => {
  console.log(`\n ⚡️ Server running in ${chalk.green(mode)} on port ${chalk.yellow(port)} ⚡️ \n`);
});

// Catch of exceptions
process.on('uncaughtException', err => logger.error('Uncaught exception', err));
process.on('unhandledRejection', err => logger.error('Unhandled rejection', err));
