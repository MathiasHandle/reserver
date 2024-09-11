import { eventsSchema } from '@/model/events'
import { db } from '@/services/database'

async function getAllEvents() {
  try {
    const eventsData = await db.select().from(eventsSchema)

    return eventsData
  } catch (err) {
    console.log(err)
  }
}

export default getAllEvents
