/*
-----------------------------------------------------------------------------------
|
| Imports
|
-----------------------------------------------------------------------------------
*/

import app from './app'
import { connectDatabase } from './setup/db'

/*
-----------------------------------------------------------------------------------
|
| Launch application 🚀
|
-----------------------------------------------------------------------------------
*/

const port = process.env.PORT || config.port
const mode = process.env.NODE_ENV || 'development'

// Connect to database
connectDatabase(() => {
  // Provision the application and start listening on a port
  app.start(port, mode)
})

// TODO: Implement these errorhandlers, fx to send an email alert
process.on('uncaughtException', err => { console.log(err); process.exit() })
process.on('unhandledRejection', err => { console.log(err); process.exit() })
