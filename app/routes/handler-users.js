/*
-----------------------------------------------------------------------------------
|
| Imports
|
-----------------------------------------------------------------------------------
*/

import { asyncRequest } from '../utils/helpers'

/*
-----------------------------------------------------------------------------------
|
| Users handler
|
-----------------------------------------------------------------------------------
*/

const usersHandler = {}

usersHandler.create = asyncRequest(async (req, res, next) => {
  const { username, email, password } = req.body
  const user = await createUser(username, email, password)
  res.status(200).json(user)
})

usersHandler.getAll = asyncRequest(async(req, res, next) => {
  const users = await getAllUsers()
  res.status(200).json(users)
})

usersHandler.getOne = asyncRequest(async(req, res, next) => {
  const userId = req.params.userId
  const user = await getOneUser(userId)
  res.status(200).json(user)
})

/*
-----------------------------------------------------------------------------------
|
| Utility functions
|
-----------------------------------------------------------------------------------
*/

function createUser (username, email, password) {
  // Function to be 'awaited' must return a promise
  return new Promise((resolve, reject) => {
    // Simulate async call to the database
    setTimeout(() => {
      return resolve({ id: Math.floor(Math.random() * 10), username, email, password })
    }, 2000)
  })
}

function getAllUsers () {
  // Function to be 'awaited' must return a promise
  return new Promise((resolve, reject) => {
    // Simulate async call to the database
    setTimeout(() => {
      return resolve([
        { username: 'Bob19', age: 19 },
        { username: 'LisaManning', age: 29 },
        { username: 'Bananonax', age: 31 },
        { username: 'Letty', age: 22 }
      ])
    }, 2000)
  })
}

function getOneUser (userId) {
  // Function to be 'awaited' must return a promise
  return new Promise((resolve, reject) => {
    // Simulate async call to the database
    setTimeout(() => {
      return resolve([
        { id: userId, username: 'Bob19', age: 19 }
      ])
    }, 2000)
  })
}

/*
-----------------------------------------------------------------------------------
|
| Exports
|
-----------------------------------------------------------------------------------
*/

export default usersHandler
