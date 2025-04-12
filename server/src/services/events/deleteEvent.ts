import { eventsSchema } from '@/model/events'
import { eq } from 'drizzle-orm'
import { db } from '../database'
import { UnauthorizedError } from '../error'
import getEventByIdOrThrow from './getEventByIdOrThrow'

async function deleteEvent(eventId: number, userId: number) {
  const event = await getEventByIdOrThrow(eventId)
  if (event.hostId !== userId) {
    throw new UnauthorizedError({
      message: 'User is not host of the event',
      detail: null,
    })
  }

  const result = await db.delete(eventsSchema).where(eq(eventsSchema.id, eventId)).returning()

  return result[0]
}

export default deleteEvent
