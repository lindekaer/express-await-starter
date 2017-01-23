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

/*
-----------------------------------------------------------------------------------
|
| Logger configuration
|
-----------------------------------------------------------------------------------
*/

export let networkLogger

// Configuration options shared between transports
const baseConfig = {
  timestamp: () => moment().format('LTS')
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
