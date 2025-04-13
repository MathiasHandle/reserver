import { type EventsInsert, eventsSchema } from '@/model/events'
import { db } from '../database'

async function createEvent(newEvent: EventsInsert) {
  const createdEvent = await db.insert(eventsSchema).values(newEvent).returning()

  return createdEvent[0]
}

export default createEvent
