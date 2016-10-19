// Use the Babel transpiler to use modern Javascript
require('babel-core/register')

var config = require('./config')
var strings = require('./app/utils/strings')

// Make both config file and strings globally available
global.config = config.default
global.strings = strings

// Load the application
require('./app')
