import type {
  GetAllEventsQueryParams,
  GetEventDetailPathParams,
} from '@/controllers/events/eventTypes'
import { ValidationError } from '@/services/error'
import type { TypedRequest } from '@/types/sharedTypes'
import type { NextFunction, Response } from 'express'

const validateGetEventDetail = (
  req: TypedRequest<GetEventDetailPathParams>,
  _res: Response,
  next: NextFunction
) => {
  const { eventId } = req.params

  // Create an object to store converted values
  // query params are strings by default
  const convertedQuery: GetAllEventsQueryParams = {}

  // Validate and convert limit
  if (eventId) {
    const eventIdNum = Number(eventId)

    if (!Number.isInteger(eventIdNum)) {
      return next(
        new ValidationError({
          message: 'Event id must be an integer',
          detail: null,
        })
      )
    }
    if (eventIdNum < 1) {
      return next(
        new ValidationError({
          message: 'Event id must be a positive integer',
          detail: null,
        })
      )
    }

    convertedQuery.limit = eventIdNum
  }

  // Replace the original query string values with converted numeric values
  req.query = convertedQuery

  next()
}

export default validateGetEventDetail
