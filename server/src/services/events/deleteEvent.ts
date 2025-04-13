import { eventsSchema } from '@/model/events'
import { eq } from 'drizzle-orm'
import { db } from '../database'
import { UnauthorizedError } from '../error'
import getEventByIdOrThrow from './getEventByIdOrThrow'

async function deleteEvent(eventId: number, userId: number) {
  // Check if event exists
  const event = await getEventByIdOrThrow(eventId)

  // Check if user is host of the event
  if (event.hostId !== userId) {
    throw new UnauthorizedError({
      message: 'User is not host of the event',
    })
  }

  const result = await db.delete(eventsSchema).where(eq(eventsSchema.id, eventId)).returning()

  return result[0]
}

export default deleteEvent
