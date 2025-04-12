import type { EditEventRequest } from '@/controllers/events/eventTypes'
import { eventsSchema } from '@/model/events'
import { eq } from 'drizzle-orm'
import { db } from '../database'
import { NotFoundError } from '../error'
import getEventById from './getEventById'

async function editEvent(event: EditEventRequest) {
  try {
    const currentEvent = await getEventById(event.id)
    if (!currentEvent) {
      throw new NotFoundError({
        message: 'Event not found',
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
  } catch (err) {
    console.log('editEvent: ', err)
    throw err
  }
}

export default editEvent
