import { userEventsSchema } from '@/model/userEvents'
import { db } from '../database'

async function joinEvent(eventId: number, userId: number) {
  try {
    await db.insert(userEventsSchema).values({
      eventId: eventId,
      participantId: userId,
    })
  } catch (err) {
    console.log('joinEvent: ', err)
    throw err
  }
}

export default joinEvent
