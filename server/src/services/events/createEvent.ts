import { type EventsInsert, eventsSchema } from '@/model/events'
import { db } from '../database'

async function createEvent(newEvent: EventsInsert) {
  try {
    const createdEvent = await db.insert(eventsSchema).values(newEvent).returning()

    return createdEvent[0]
  } catch (err) {
    console.log('createEvent: ', err)
    throw err
  }
}

export default createEvent
