import type { Event } from '@/controllers/events/eventTypes'
import { eventCategoriesSchema } from '@/model/eventCategories'
import { eventsSchema } from '@/model/events'
import { userEventsSchema } from '@/model/userEvents'
import { eq, getTableColumns, sql } from 'drizzle-orm'
import { db } from '../database'

async function getEventsCreatedByUser(userId: number): Promise<Event[] | undefined> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { categoryId, ...event } = getTableColumns(eventsSchema)
    const eventCategory = getTableColumns(eventCategoriesSchema)

    const events = await db
      .select({
        ...event,
        eventCategory,
        participantsCount: sql<number>`(
          SELECT COUNT(*) FROM ${userEventsSchema}
          WHERE ${userEventsSchema.eventId} = ${eventsSchema.id}
        )`.as('participantsCount'),
      })
      .from(eventsSchema)
      .where(eq(eventsSchema.hostId, userId))
      .leftJoin(eventCategoriesSchema, eq(eventsSchema.categoryId, eventCategoriesSchema.id))

    return events
  } catch (err) {
    console.log('getEventsByUser: ', err)
    throw err
  }
}

export default getEventsCreatedByUser
