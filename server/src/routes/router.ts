import httpCodes from '@/constants/httpCodes'
import { eventsController } from '@/controllers/events'
import { usersController } from '@/controllers/users'
import { checkAuth, checkNotAuth } from '@/middleware/auth'
import eventsValidator from '@/middleware/validation/events'
import usersValidator from '@/middleware/validation/users'
import type { Request, Response } from 'express'
import express from 'express'

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
  console.log(req.session)

  res.status(httpCodes.OK).json({ message: 'Hello World' })
})

//#region Users
const usersBaseUrl = '/api/users'

// get all users -> just for testing
router.get(usersBaseUrl, usersController.handleGetAllUsers)

// register new user
router.post(
  usersBaseUrl,
  checkNotAuth,
  usersValidator.validateCreateUser,
  usersController.handleCreateUser
)

// get current user
router.get(`${usersBaseUrl}/me`, checkAuth, usersController.handleCheckAuth)

// logout user
router.post(`${usersBaseUrl}/logout`, checkAuth, usersController.handleLogout)

// TODO add auth middleware
// delete user
router.delete(
  `${usersBaseUrl}/:userId`,
  usersValidator.validateDeleteUser,
  usersController.handleDeleteUser
)

// login user
router.post(
  `${usersBaseUrl}/login`,
  checkNotAuth,
  usersValidator.validateLogin,
  usersController.handleLogin
)

//#endregion

//#region Events
const eventsBaseUrl = '/api/events'

// Get all events
router.get(eventsBaseUrl, eventsValidator.validateGetAllEvents, eventsController.handleGetAllEvents)

// Get all events by user id
router.get(`${eventsBaseUrl}/my-created`, checkAuth, eventsController.handleGetMyCreatedEvents)

// Get event categories
router.get(
  `${eventsBaseUrl}/categories`,
  eventsValidator.validateGetEventCategories,
  eventsController.handleGetEventCategories
)

// Get events joined by user
router.get(`${eventsBaseUrl}/my-joined`, checkAuth, eventsController.handleGetJoinedEvents)

// Get event by id
router.get(
  `${eventsBaseUrl}/:eventId`,
  eventsValidator.validateGetEventDetail,
  eventsController.handleGetEventById
)

// Edit event
router.put(
  `${eventsBaseUrl}/:eventId`,
  checkAuth,
  eventsValidator.validateEventIdInPath,
  eventsValidator.validateEditEvent,
  eventsController.handleEditEvent
)

// Delete event
router.delete(
  `${eventsBaseUrl}/:eventId`,
  checkAuth,
  eventsValidator.validateEventIdInPath,
  eventsController.handleDeleteEvent
)

// Create event
router.post(
  `${eventsBaseUrl}`,
  checkAuth,
  eventsValidator.validateCreateEvent,
  eventsController.handleCreateEvent
)

// Join event
router.post(
  `${eventsBaseUrl}/join/:eventId`,
  checkAuth,
  eventsValidator.validateEventIdInPath,
  eventsValidator.validateJoinEvent,
  eventsController.handleJoinEvent
)

//#endregion

export default router
