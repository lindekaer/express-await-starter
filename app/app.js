/*
-----------------------------------------------------------------------------------
|
| Imports
|
-----------------------------------------------------------------------------------
*/

import chalk from 'chalk'
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import compression from 'compression'
import helmet from 'helmet'
import { networkLogger, appLogger as logger } from './setup/logger'
import { setupApiRoutes } from './routes'

/*
-----------------------------------------------------------------------------------
|
| Application configuration
|
-----------------------------------------------------------------------------------
*/

const app = express()

// Extend the app with a custom start function
app.start = (port, mode) => {
  provisionApp()
  app.listen(port, () => {
    logger.info(`⚡️ Server running in ${chalk.green(mode)} on port ${chalk.yellow(port)} ⚡️`)
  })
}

function provisionApp () {
  app.set('title', config.name)           // The title of the application
  app.set('x-powered-by', null)           // Remove the 'powered by Express'
  app.set('env', process.env.NODE_ENV)    // Set application in appropriate mode
  app.set('strict routing', true)         // Now /foo is not equal to /foo/
  app.set('case sensitive routing', true) // Now /Wakies is not equal to /wakies
  app.set('json spaces', 2)               // JSON returned is indented with spaces
  app.use(bodyParser.json())              // JSON is parsed and places in req.body
  app.use(compression())                  // Compress response bodies
  app.use(helmet())                       // Helps to secure the app with various HTTP headers

  // Add field to determine if running in production
  app.isProd = process.env.NODE_ENV === 'production'

  // Log all network requests
  if (process.env.NODE_ENV !== 'test') {
    const loggingSetting = app.isProd ? 'combined' : 'dev'
    app.use(morgan(loggingSetting, { stream: networkLogger.stream }))
  }

  // Add route-handling to application
  setupApiRoutes(app)

  // Add error handler to application
  app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send(strings.ERROR)
  })
}

/*
-----------------------------------------------------------------------------------
|
| Exports
|
-----------------------------------------------------------------------------------
*/

export default app
