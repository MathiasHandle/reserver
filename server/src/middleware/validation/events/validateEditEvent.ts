import type { EditEventPathParams, EditEventRequest } from '@/controllers/events/eventTypes'
import type { TypedRequest } from '@/types/sharedTypes'
import type { NextFunction, Response } from 'express'
import { eventInsertSchema } from '../schemas'
import { checkEventCategory, checkFutureDateTime } from '../utils'

const editEventSchema = eventInsertSchema

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
    next(err)
  }
}

export default validateEditEvent
