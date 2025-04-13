import type { EditEventPathParams, EditEventRequest } from '@/controllers/events/eventTypes'
import { ValidationError } from '@/services/error'
import type { TypedRequest } from '@/types/sharedTypes'
import type { NextFunction, Response } from 'express'
import { z, ZodError } from 'zod'
import { eventInsertSchema } from '../schemas'
import { checkEventCategory, checkFutureDateTime } from '../utils'

const editEventSchema = eventInsertSchema.extend({
  id: z.number().int('Event ID must be an integer'),
})

async function validateEditEvent(
  req: TypedRequest<EditEventPathParams, EditEventRequest>,
  _res: Response,
  next: NextFunction
) {
  try {
    editEventSchema.parse(req.body)

    // Validate date is not in the past
    checkFutureDateTime(new Date(req.body.date), 'date')

    // Validate event category
    await checkEventCategory(req.body.categoryId, 'categoryId')

    next()
  } catch (err) {
    if (err instanceof ZodError) {
      const validationError = new ValidationError({
        message: 'Invalid event data',
        detail: {
          ...err.flatten().fieldErrors,
        },
      })
      next(validationError)
      return
    }

    next(err)
  }
}

export default validateEditEvent
