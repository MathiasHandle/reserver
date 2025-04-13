import httpCodes from '@/constants/httpCodes'
import { UnauthorizedError } from '@/services/error'
import {
  createEvent,
  deleteEvent,
  editEvent,
  getAllEvents,
  getEventById,
  getEventByIdOrThrow,
  getEventCategories,
  getEventsCreatedByUser,
  getJoinedEvents,
  joinEvent,
} from '@/services/events'
import type {
  ApiEmptyPathParams,
  ApiEmptyRequestBody,
  APIEmptyResponse,
  TypedRequest,
} from '@/types/sharedTypes'
import type { NextFunction, Response } from 'express'
import type {
  CreateEventRequest,
  CreateEventResponse,
  DeleteEventPathParams,
  EditEventPathParams,
  EditEventRequest,
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

async function handleGetAllEvents(
  req: TypedRequest<ApiEmptyPathParams, ApiEmptyRequestBody, GetAllEventsQueryParams>,
  res: Response<GetAllEventsResponse>,
  next: NextFunction
) {
  try {
    const events = await getAllEvents(req.query)

    res.status(httpCodes.OK).json({ events: events ?? [] })
  } catch (err) {
    next(err)
  }
}

async function handleGetEventCategories(
  req: TypedRequest<ApiEmptyPathParams, ApiEmptyRequestBody, GetEventCategoriesQueryParams>,
  res: Response<GetEventCategoriesResponse>,
  next: NextFunction
) {
  try {
    const categories = await getEventCategories(req.query)

    res.status(httpCodes.OK).json({ categories: categories ?? [] })
  } catch (err) {
    next(err)
  }
}

async function handleGetEventById(
  req: TypedRequest<GetEventDetailPathParams>,
  res: Response<GetEventDetailResponse>,
  next: NextFunction
) {
  try {
    const eventId = Number(req.params.eventId)

    const eventData = await getEventByIdOrThrow(eventId)
    res.status(httpCodes.OK).json({ event: eventData })
  } catch (err) {
    return next(err)
  }
}

async function handleCreateEvent(
  req: TypedRequest<ApiEmptyPathParams, CreateEventRequest>,
  res: Response<CreateEventResponse>,
  next: NextFunction
) {
  try {
    const createdEvent = await createEvent(req.body)
    const eventFullData = await getEventById(createdEvent.id)
    if (!eventFullData) {
      throw new Error('Internal server error')
    }

    res.status(httpCodes.CREATED).json({ event: eventFullData })
  } catch (err) {
    next(err)
  }
}

async function handleGetMyCreatedEvents(
  req: TypedRequest,
  res: Response<GetEventsByUserResponse>,
  next: NextFunction
) {
  try {
    const userId = req.session.user?.id
    // Shouldnt happen, because of auth middleware
    if (!userId) {
      throw new UnauthorizedError()
    }

    const events = await getEventsCreatedByUser(userId)

    res.status(httpCodes.OK).json({ events: events ?? [] })
  } catch (err) {
    next(err)
  }
}

async function handleJoinEvent(
  req: TypedRequest<JoinEventPathParams>,
  res: Response<JoinEventResponse>,
  next: NextFunction
) {
  try {
    const userId = req.session.user?.id
    // Shouldnt happen, because of auth middleware
    if (!userId) {
      throw new UnauthorizedError()
    }

    await joinEvent(Number(req.params.eventId), userId)

    res.status(httpCodes.OK).json({})
  } catch (err) {
    next(err)
  }
}

async function handleGetJoinedEvents(
  req: TypedRequest,
  res: Response<GetJoinedEventsResponse>,
  next: NextFunction
) {
  try {
    const userId = req.session.user?.id
    // Shouldnt happen, because of auth middleware
    if (!userId) {
      throw new UnauthorizedError()
    }

    const events = await getJoinedEvents(userId)

    res.status(httpCodes.OK).json({ events: events ?? [] })
  } catch (err) {
    next(err)
  }
}

async function handleEditEvent(
  req: TypedRequest<EditEventPathParams, EditEventRequest>,
  res: Response<APIEmptyResponse>,
  next: NextFunction
) {
  try {
    const userId = req.session.user?.id
    // Shouldnt happen, because of auth middleware
    if (!userId) {
      throw new UnauthorizedError()
    }

    await editEvent(req.body, userId)

    res.status(httpCodes.OK).json({})
  } catch (err) {
    next(err)
  }
}

async function handleDeleteEvent(
  req: TypedRequest<DeleteEventPathParams>,
  res: Response<APIEmptyResponse>,
  next: NextFunction
) {
  try {
    const userId = req.session.user?.id
    // Shouldnt happen, because of auth middleware
    if (!userId) {
      throw new UnauthorizedError()
    }

    await deleteEvent(Number(req.params.eventId), userId)

    res.status(httpCodes.OK).send({})
  } catch (err) {
    next(err)
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
  handleEditEvent,
  handleDeleteEvent,
}
