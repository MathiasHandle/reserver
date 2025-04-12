import { NotFoundError } from '../error'
import getEventById from './getEventById'

async function getEventByIdOrThrow(eventId: number) {
  const event = await getEventById(eventId)

  if (!event) {
    throw new NotFoundError({
      message: 'Event not found',
      detail: null,
    })
  }

  return event
}

export default getEventByIdOrThrow
