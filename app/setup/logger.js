import winston from 'winston';
import path from 'path';
import moment from 'moment';
import config from '../../config';

// Define appLogger here, so it can be assigned according to NODE_ENV
export let appLogger;
export let networkLogger;

if (process.env.NODE_ENV === 'production') {
  appLogger = new winston.Logger({
    transports: [
      new winston.transports.File({
        name: `${config.name}-app-log`,
        filename: path.join(__dirname, '..', 'logs', 'app.log'),
        level: 'info'
      })
    ]
  });
} else {
  appLogger = new winston.Logger({
    transports: [
      new winston.transports.Console({
        name: `${config.name}-app-log`,
        level: 'debug',
        colorize: true,
        timestamp: true,
        prettyPrint: true
      })
    ]
  });
}

if (process.env.NODE_ENV === 'production') {
  networkLogger = new winston.Logger({
    transports: [
      new winston.transports.File({
        name: `${config.name}-http-log`,
        filename: path.join(__dirname, '..', 'logs', 'network.log'),
        level: 'info'
      })
    ]
  });
} else {
  networkLogger = new winston.Logger({
    transports: [
      new winston.transports.Console({
        name: `${config.name}-http-log`,
        colorize: true,
        timestamp: () => moment().format('LTS'),
        prettyPrint: true,
        level: 'info'
      })
    ]
  });
}

// Stream used by the Morgan module
networkLogger.stream = {
  write: message => networkLogger.info(message)
};
