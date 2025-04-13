import { userEventsSchema } from '@/model/userEvents'
import { db } from '../database'

async function joinEvent(eventId: number, userId: number) {
  await db.insert(userEventsSchema).values({
    eventId: eventId,
    participantId: userId,
  })
}

export default joinEvent
