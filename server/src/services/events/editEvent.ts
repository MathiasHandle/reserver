import type { EditEventRequest } from '@/controllers/events/eventTypes'
import { eventsSchema } from '@/model/events'
import { eq } from 'drizzle-orm'
import { db } from '../database'
import { UnauthorizedError } from '../error'
import getEventByIdOrThrow from './getEventByIdOrThrow'

async function editEvent(event: EditEventRequest, userId: number) {
  // Check if event exists
  const currentEvent = await getEventByIdOrThrow(event.id)

  // Check if user is owner of the event
  if (currentEvent.hostId !== userId) {
    throw new UnauthorizedError({
      message: 'User is not host of the event',
      detail: null,
    })
  }

  await db
    .update(eventsSchema)
    .set({
      name: event.name,
      description: event.description,
      maxCapacity: event.maxCapacity,
      categoryId: event.categoryId,
      date: event.date,
    })
    .where(eq(eventsSchema.id, event.id))
}

export default editEvent
