/*
-----------------------------------------------------------------------------------
|
| Helper functions
|
-----------------------------------------------------------------------------------
*/

export const asyncRequest = (handler) => {
  return (req, res, next) => {
    return handler(req, res, next).catch(next)
  }
}
