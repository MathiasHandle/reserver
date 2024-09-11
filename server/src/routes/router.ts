import httpCodes from '@/constants/httpCodes'
import { eventsController } from '@/controllers/events'
import { usersController } from '@/controllers/users'
import express, { Request, Response } from 'express'

const router = express.Router()

router.get('/', (_: Request, res: Response) => {
  res.status(httpCodes.OK).send('Hello World')
})

const usersBaseUrl = '/api/users'

router.get(usersBaseUrl, usersController.handleGetAllUsers)
router.post(usersBaseUrl, usersController.handleCreateUser)
router.get(`${usersBaseUrl}/:userId`, usersController.handleGetUserById)
router.delete(usersBaseUrl, usersController.handleDeleteUser)

const eventsBaseUrl = '/api/events'

router.get(eventsBaseUrl, eventsController.handleGetAllEvents)
router.get(`${eventsBaseUrl}/:eventId`, eventsController.handleGetEventById)

export default router
