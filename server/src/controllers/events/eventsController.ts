import httpCodes from '@/constants/httpCodes'
import { NotFoundError } from '@/services/error'
import {
  createEvent,
  getAllEvents,
  getEventById,
  getEventCategories,
  getEventsCreatedByUser,
  getJoinedEvents,
  joinEvent,
} from '@/services/events'
import type { EmptyObject, TypedRequest } from '@/types/sharedTypes'
import type { NextFunction, Request, Response } from 'express'
import type {
  CreateEventRequest,
  CreateEventResponse,
  GetAllEventsQueryParams,
  GetAllEventsResponse,
  GetEventCategoriesQueryParams,
  GetEventCategoriesResponse,
  GetEventDetailPathParams,
  GetEventDetailResponse,
  GetEventsByUserResponse,
  GetJoinedEventsResponse,
  JoinEventPathParams,
  JoinEventResponse,
} from './eventTypes'

type ErrorResponse = {
  message: string
}

async function handleGetAllEvents(
  req: TypedRequest<undefined, undefined, GetAllEventsQueryParams>,
  res: Response<GetAllEventsResponse | ErrorResponse>
) {
  try {
    const events = await getAllEvents(req.query)

    res.status(httpCodes.OK).json({ events: events ?? [] })
  } catch (err) {
    console.log(err)
    res.status(httpCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
  }
}

async function handleGetEventCategories(
  req: TypedRequest<undefined, undefined, GetEventCategoriesQueryParams>,
  res: Response<GetEventCategoriesResponse>,
  next: NextFunction
) {
  try {
    const categories = await getEventCategories(req.query)

    res.status(httpCodes.OK).json({ categories: categories ?? [] })
  } catch (err) {
    console.log(err)
    next(err)
  }
}

async function handleGetEventById(
  req: Request<GetEventDetailPathParams>,
  res: Response<GetEventDetailResponse | ErrorResponse>,
  next: NextFunction
) {
  try {
    const eventData = await getEventById(req.params.eventId)

    if (!eventData) {
      const notFoundError = new NotFoundError({
        message: 'Event not found',
        status: httpCodes.NOT_FOUND,
        detail: null,
      })

      return next(notFoundError)
    }

    res.status(httpCodes.OK).json({ event: eventData })
  } catch (err) {
    if (err instanceof NotFoundError) {
      return next(err)
    }

    console.log(err)
    res.status(httpCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
  }
}

async function handleCreateEvent(
  req: TypedRequest<EmptyObject, CreateEventRequest>,
  res: Response<CreateEventResponse | ErrorResponse>
) {
  try {
    const createdEvent = await createEvent(req.body)
    const eventFullData = await getEventById(createdEvent.id)
    if (!eventFullData) return

    res.status(httpCodes.CREATED).json({ event: eventFullData })
  } catch (err) {
    console.log(err)
    res.status(httpCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
  }
}

async function handleGetMyCreatedEvents(
  req: TypedRequest,
  res: Response<GetEventsByUserResponse | ErrorResponse>
) {
  try {
    // Shouldnt happen, because of auth middleware
    const userId = req.session.user?.id
    if (!userId) return

    const events = await getEventsCreatedByUser(userId)

    res.status(httpCodes.OK).json({ events: events ?? [] })
  } catch (err) {
    console.log(err)
    res.status(httpCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
  }
}

async function handleJoinEvent(
  req: TypedRequest<JoinEventPathParams>,
  res: Response<JoinEventResponse | ErrorResponse>
) {
  try {
    // Shouldnt happen, because of auth middleware
    const userId = req.session.user?.id
    if (!userId) return

    await joinEvent(Number(req.params.eventId), userId)

    res.status(httpCodes.OK).json({})
  } catch (err) {
    console.log(err)
    res.status(httpCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
  }
}

async function handleGetJoinedEvents(
  req: Request,
  res: Response<GetJoinedEventsResponse | ErrorResponse>
) {
  try {
    console.log('handleGetJoinedEvents')

    const userId = req.session.user?.id
    if (!userId) return

    const events = await getJoinedEvents(userId)

    res.status(httpCodes.OK).json({ events: events ?? [] })
  } catch (err) {
    console.log(err)
    res.status(httpCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
  }
}

export default {
  handleGetAllEvents,
  handleGetEventById,
  handleGetEventCategories,
  handleCreateEvent,
  handleGetMyCreatedEvents,
  handleJoinEvent,
  handleGetJoinedEvents,
}
