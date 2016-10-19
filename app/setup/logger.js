/*
-----------------------------------------------------------------------------------
|
| Imports
|
-----------------------------------------------------------------------------------
*/

import winston from 'winston'
import path from 'path'
import moment from 'moment'
import noopLogger from 'noop-logger'

/*
-----------------------------------------------------------------------------------
|
| Logger configuration
|
-----------------------------------------------------------------------------------
*/

// Define appLogger here, so it can be assigned according to NODE_ENV
export let appLogger
export let networkLogger

// Configuration options shared between transports
const baseConfig = {
  timestamp: () => moment().format('LTS')
}

/*
-----------------------------------------------------------------------------------
|
| Application logger
|
-----------------------------------------------------------------------------------
*/

if (process.env.NODE_ENV === 'production') {
  const appLoggerConfig = Object.assign(baseConfig, {
    name: `${config.name}-app-log`,
    filename: path.join(__dirname, '..', 'logs', 'app.log'),
    level: 'info'
  })

  appLogger = new winston.Logger({
    transports: [new winston.transports.File(appLoggerConfig)]
  })
} else if (process.env.NODE_ENV === 'development') {
  const appLoggerConfig = Object.assign(baseConfig, {
    name: `${config.name}-app-log`,
    level: 'debug',
    colorize: true,
    prettyPrint: true
  })

  appLogger = new winston.Logger({
    transports: [new winston.transports.Console(appLoggerConfig)]
  })
} else {
  // Noop logger for testing
  appLogger = noopLogger
}

/*
-----------------------------------------------------------------------------------
|
| Network logger
|
-----------------------------------------------------------------------------------
*/

if (process.env.NODE_ENV === 'production') {
  const networkLoggerConfig = Object.assign(baseConfig, {
    name: `${config.name}-http-log`,
    filename: path.join(__dirname, '..', 'logs', 'network.log'),
    level: 'info'
  })

  networkLogger = new winston.Logger({
    transports: [new winston.transports.File(networkLoggerConfig)]
  })
} else {
  const networkLoggerConfig = Object.assign(baseConfig, {
    name: `${config.name}-http-log`,
    level: 'debug',
    colorize: true,
    prettyPrint: true
  })

  networkLogger = new winston.Logger({
    transports: [new winston.transports.Console(networkLoggerConfig)]
  })
}

// Stream used by the Morgan module
networkLogger.stream = {
  write: message => networkLogger.info(message)
}
