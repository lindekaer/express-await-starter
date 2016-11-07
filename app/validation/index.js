/*
-----------------------------------------------------------------------------------
|
| Imports
|
-----------------------------------------------------------------------------------
*/

import Joi from 'joi'
import usersSchema from './users'

/*
-----------------------------------------------------------------------------------
|
| Validation of request against model schema
|
-----------------------------------------------------------------------------------
*/

const schemas = {
  users: usersSchema
}

function validate (model, method) {
  // Return the middleware that validates req.body
  return (req, res, next) => {
    const schema = schemas[model][method]

    const validationOptions = {
      abortEarly: false,
      presence: 'required'
    }

    Joi.validate(req.body, schema, validationOptions, (err, value) => {
      if (err) next(err)
      else next()
    })
  }
}

/*
-----------------------------------------------------------------------------------
|
| Exports
|
-----------------------------------------------------------------------------------
*/

export default validate
