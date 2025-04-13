import httpCodes from '@/constants/httpCodes'
import type { JoinEventPathParams } from '@/controllers/events/eventTypes'
import { UnauthorizedError, ValidationError } from '@/services/error'
import {
  getEventByIdOrThrow,
  getEventParticipants,
  getEventsCreatedByUser,
} from '@/services/events'
import type { TypedRequest } from '@/types/sharedTypes'
import type { NextFunction, Response } from 'express'

async function validateJoinEvent(
  req: TypedRequest<JoinEventPathParams>,
  _res: Response,
  next: NextFunction
) {
  try {
    const userId = req.session.user?.id
    if (!userId) {
      throw new UnauthorizedError({ detail: null })
    }

    const { eventId } = req.params

    // Check if event exists
    const toBeJoinedEvent = await getEventByIdOrThrow(Number(eventId))

    // Check if user isn't host of the event
    const hostedEvents = await getEventsCreatedByUser(userId)

    if (hostedEvents && hostedEvents.length) {
      const hostEvent = hostedEvents.find(event => event.hostId === toBeJoinedEvent?.hostId)
      if (hostEvent) {
        const validationError = new ValidationError({
          message: 'User cannot join his own event',
          detail: null,
          status: httpCodes.BAD_REQUEST,
        })

        return next(validationError)
      }
    }

    // Check if user hasn't already joined the event
    const participants = await getEventParticipants(Number(eventId))
    if (participants && participants.length) {
      const userJoinedEvent = participants.find(participant => participant.id === userId)
      if (userJoinedEvent) {
        const validationError = new ValidationError({
          message: 'User already joined the event',
          detail: null,
          status: httpCodes.BAD_REQUEST,
        })

        return next(validationError)
      }
    }

    next()
  } catch (err) {
    if (err instanceof ValidationError) {
      return next(err)
    }

    next(err)
  }
}

export default validateJoinEvent
