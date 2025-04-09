import httpCodes from '@/constants/httpCodes'
import { NotFoundError } from '@/services/error'
import { getAllEvents, getEventById, getEventCategories } from '@/services/events'
import type { TypedRequest } from '@/types/sharedTypes'
import type { NextFunction, Request, Response } from 'express'
import type {
  GetAllEventsQueryParams,
  GetAllEventsResponse,
  GetEventCategoriesQueryParams,
  GetEventCategoriesResponse,
  GetEventDetailPathParams,
  GetEventDetailResponse,
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
        status: httpCodes.UNPROCESSABLE_ENTITY,
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

export default {
  handleGetAllEvents,
  handleGetEventById,
  handleGetEventCategories,
}
