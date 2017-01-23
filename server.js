// Use the Babel transpiler to use modern Javascript
require('babel-core/register')

// Make both config file and strings globally available
global.config = require('./config').default
global.strings = require('./app/utils/strings')

const cluster = require('cluster')
const os = require('os')

if (cluster.isMaster) {
  // Get number of CPUs
  const cpuCount = os.cpus().length

  // Start workers
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork()
  }

  // Recreate workers on exit
  cluster.on('exit', (worker) => {
    cluster.fork()
  })
} else {
  require('./app')
}
