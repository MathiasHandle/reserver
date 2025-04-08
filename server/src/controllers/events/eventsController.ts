import httpCodes from '@/constants/httpCodes'
import type { Event } from '@/model/events'
import { getAllEvents, getEventById, getEventCategories } from '@/services/events'
import type { TypedRequest } from '@/types/sharedTypes'
import type { NextFunction, Request, Response } from 'express'
import type {
  GetAllEventsQueryParams,
  GetAllEventsResponse,
  GetEventCategoriesQueryParams,
  GetEventCategoriesResponse,
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

type GetEventPathParams = {
  eventId: string
}

type GetEventByIdResponse = {
  event: Event | null
}

async function handleGetEventById(
  req: Request<GetEventPathParams>,
  res: Response<GetEventByIdResponse | ErrorResponse>
) {
  try {
    const eventId = parseInt(req.params.eventId)
    const eventData = await getEventById(eventId)

    res.status(httpCodes.OK).json({ event: eventData ?? null })
  } catch (err) {
    console.log(err)
    res.status(httpCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
  }
}

export default {
  handleGetAllEvents,
  handleGetEventById,
  handleGetEventCategories,
}
