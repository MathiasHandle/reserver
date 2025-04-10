import type { CreateEventRequest } from '@/controllers/events/eventTypes'
import { ValidationError } from '@/services/error'
import { getEventByName, getEventCategoryById } from '@/services/events'
import type { EmptyObject, TypedRequest } from '@/types/sharedTypes'
import type { NextFunction, Response } from 'express'
import { z } from 'zod'

const createEventSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long').max(100, 'Name is too long'),
  date: z.string().datetime('Invalid date format'),
  categoryId: z.number().int('Category ID must be an integer'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters long')
    .max(1000, 'Description is too long'),
  maxCapacity: z.number().int('Capacity must be an integer').min(1, 'Capacity must be at least 1'),
})

async function validateCreateEvent(
  req: TypedRequest<EmptyObject, CreateEventRequest>,
  _res: Response,
  next: NextFunction
) {
  try {
    createEventSchema.parse(req.body)

    // Validate event category
    const eventCategory = await getEventCategoryById(req.body.categoryId)
    if (!eventCategory) {
      const validationError = new ValidationError({
        message: 'Event category not found',
        detail: {
          categoryId: ['Event category not found'],
        },
      })
      return next(validationError)
    }

    // Validate that event with same name doesn't exist
    const event = await getEventByName(req.body.name)
    if (event) {
      const validationError = new ValidationError({
        message: 'Event with same name already exists',
        detail: {
          name: ['Event with same name already exists'],
        },
      })
      return next(validationError)
    }

    // Add hostId to request body if user is authenticated (middleware is used after checkAuth middleware)
    if (req.session.user) {
      req.body.hostId = req.session.user.id
    }

    next()
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.log('validation error: ', err)

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
