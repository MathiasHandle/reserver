import { eventsSchema } from '@/model/events'
import { db } from '@/services/database'
import { eq } from 'drizzle-orm'

async function getEventById(eventId: number) {
  try {
    const eventData = await db.select().from(eventsSchema).where(eq(eventsSchema.id, eventId))

    return eventData[0]
  } catch (err) {
    console.log(err)
  }
}

export default getEventById
