/*
-----------------------------------------------------------------------------------
|
| Imports
|
-----------------------------------------------------------------------------------
*/

import basicAuth from 'basic-auth'

/*
-----------------------------------------------------------------------------------
|
| Basic auth middleware
|
-----------------------------------------------------------------------------------
*/

const basicAuthMiddleware = (req, res, next) => {
  const credentials = basicAuth(req)
  if (!credentials || !credentials.username === config.auth.username || !credentials.pass === config.auth.pass) {
    res.status(401).send(strings.NOT_AUTHORIZED_BASIC_AUTH)
  } else {
    next()
  }
}

/*
-----------------------------------------------------------------------------------
|
| Exports
|
-----------------------------------------------------------------------------------
*/

export default basicAuthMiddleware
