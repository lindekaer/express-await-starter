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
const mode = process.env.NODE_ENV

// Check for valid application modes
if (mode !== 'development' || mode !== 'production' || mode !== 'test') {
  console.log('\nPlease run the application with one of the following allowed NODE_ENV:')
  console.log('(development | production | test)')
  console.log('For example, NODE_ENV=development node server.js\n')
  process.exit()
}

// Connect to database
connectDatabase(() => {
  // Provision the application and start listening on a port
  app.start(port, mode)
})

// TODO: Implement these errorhandlers, fx to send an email alert
process.on('uncaughtException', err => { console.log(err); process.exit() })
process.on('unhandledRejection', err => { console.log(err); process.exit() })
