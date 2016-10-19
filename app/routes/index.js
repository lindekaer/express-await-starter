/*
-----------------------------------------------------------------------------------
|
| Imports
|
-----------------------------------------------------------------------------------
*/

import { Router } from 'Express'
import basicAuthMiddleware from '../middlewares/basic-auth'
import usersHandler from './handler-users'

/*
-----------------------------------------------------------------------------------
|
| API routes setup
|
-----------------------------------------------------------------------------------
*/

function setupApiRoutes (app) {
  const apiRouter = new Router({
    caseSensitive: app.get('case sensitive routing'),
    strict: app.get('strict routing')
  })

  // Require Basic Auth for all API requests
  apiRouter.use(basicAuthMiddleware)

  apiRouter.get('/users', usersHandler.getAll)
  apiRouter.get('/users/:userId', usersHandler.getOne)

  // Nest all api routes under http://HOST:PORT/api/v1/PATH
  app.use('/api/v1', apiRouter)
}

/*
-----------------------------------------------------------------------------------
|
| Exports
|
-----------------------------------------------------------------------------------
*/

export { setupApiRoutes }
