import httpCodes from '@/constants/httpCodes'
import { eventsController } from '@/controllers/events'
import { usersController } from '@/controllers/users'
import express, { Request, Response } from 'express'
import usersValidator from '@/middleware/validation/users'

const router = express.Router()

router.get('/', (_: Request, res: Response) => {
  res.status(httpCodes.OK).send('Hello World')
})

const usersBaseUrl = '/api/users'

router.get(usersBaseUrl, usersController.handleGetAllUsers)
router.post(usersBaseUrl, usersValidator.validateCreateUser, usersController.handleCreateUser)
router.get(`${usersBaseUrl}/:userId`, usersValidator.validateUserIdPath, usersController.handleGetUserById)
router.delete(`${usersBaseUrl}/:userId`, usersValidator.validateDeleteUser, usersController.handleDeleteUser)

const eventsBaseUrl = '/api/events'

router.get(eventsBaseUrl, eventsController.handleGetAllEvents)
router.get(`${eventsBaseUrl}/:eventId`, eventsController.handleGetEventById)

export default router
