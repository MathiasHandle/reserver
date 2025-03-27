import httpCodes from '@/constants/httpCodes'
import { eventsController } from '@/controllers/events'
import { usersController } from '@/controllers/users'
import usersValidator from '@/middleware/validation/users'
import type { Request, Response } from 'express'
import express from 'express'

const router = express.Router()

router.get('/', (_: Request, res: Response) => {
  res.status(httpCodes.OK).send('Hello World')
})

// TODO trim and escape inputs
// TODO check/add validations for restricted characters

//#region Users
const usersBaseUrl = '/api/users'

// get all users
router.get(usersBaseUrl, usersController.handleGetAllUsers)

// register new user
router.post(usersBaseUrl, usersValidator.validateCreateUser, usersController.handleCreateUser)

// get single user
router.get(
  `${usersBaseUrl}/:userId`,
  usersValidator.validateUserIdPath,
  usersController.handleGetUserById
)

// delele user
router.delete(
  `${usersBaseUrl}/:userId`,
  usersValidator.validateDeleteUser,
  usersController.handleDeleteUser
)

// login user
router.post(`${usersBaseUrl}/login`, usersValidator.validateLogin, usersController.handleLogin)

//#endregion

//#region Events
const eventsBaseUrl = '/api/events'

router.get(eventsBaseUrl, eventsController.handleGetAllEvents)
router.get(`${eventsBaseUrl}/:eventId`, eventsController.handleGetEventById)
//#endregion

export default router
