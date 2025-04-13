import type { CreateEventRequest } from '@/controllers/events/eventTypes'
import { ValidationError } from '@/services/error'
import type { ApiEmptyPathParams, TypedRequest } from '@/types/sharedTypes'
import type { NextFunction, Response } from 'express'
import { z } from 'zod'
import { eventInsertSchema } from '../schemas'
import { checkEventCategory, checkFutureDateTime, checkSameNameEvent } from '../utils'

const createEventSchema = eventInsertSchema

async function validateCreateEvent(
  req: TypedRequest<ApiEmptyPathParams, CreateEventRequest>,
  _res: Response,
  next: NextFunction
) {
  try {
    createEventSchema.parse(req.body)

    // Validate date is not in the past
    checkFutureDateTime(new Date(req.body.date), 'date')

    // Validate event category
    await checkEventCategory(req.body.categoryId, 'categoryId')

    // Validate that event with same name doesn't exist
    await checkSameNameEvent(req.body.name, 'name')

    // Add hostId to request body if user is authenticated (middleware is used after checkAuth middleware)
    if (req.session.user) {
      req.body.hostId = req.session.user.id
    }

    next()
  } catch (err) {
    if (err instanceof z.ZodError) {
      const validationError = new ValidationError({
        message: 'Invalid data',
        detail: {
          ...err.flatten().fieldErrors,
        },
      })

      return next(validationError)
    }

    next(err)
  }
}

export default validateCreateEvent
