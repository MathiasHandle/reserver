import type { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

const eventIdSchema = z
  .number()
  .int('Event id must be an integer')
  .positive('Event id must be a positive integer')

// TODO replace validateGetEventDetail with this
function validateEventIdInPath(req: Request, _res: Response, next: NextFunction) {
  try {
    const { eventId } = req.params

    const eventIdNum = Number(eventId)

    eventIdSchema.parse(eventIdNum)
  } catch (err) {
    next(err)
  }

  next()
}

export default validateEventIdInPath
