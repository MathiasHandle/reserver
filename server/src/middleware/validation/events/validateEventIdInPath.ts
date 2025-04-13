import { ValidationError } from '@/services/error'
import type { NextFunction, Request, Response } from 'express'
import { z, ZodError } from 'zod'

const eventIdSchema = z
  .number()
  .int('Event id must be an integer')
  .positive('Event id must be a positive integer')

function validateEventIdInPath(req: Request, _res: Response, next: NextFunction) {
  try {
    const eventId = req.params.eventId

    eventIdSchema.parse(Number(eventId))
    next()
  } catch (err) {
    if (err instanceof ZodError) {
      const validationError = new ValidationError({
        message: 'Invalid event id',
        detail: {
          eventId: err.errors[0].message,
        },
      })

      return next(validationError)
    }

    next(err)
  }
}

export default validateEventIdInPath
