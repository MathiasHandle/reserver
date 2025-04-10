import type { Event } from '@/controllers/events/eventTypes'
import { eventCategoriesSchema } from '@/model/eventCategories'
import { eventsSchema } from '@/model/events'
import { userEventsSchema } from '@/model/userEvents'
import { eq, getTableColumns, sql } from 'drizzle-orm'
import { db } from '../database'

async function getEventByName(eventName: string): Promise<Event | undefined> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { categoryId, ...eventDetail } = getTableColumns(eventsSchema)
    const eventCategory = getTableColumns(eventCategoriesSchema)

    const event = await db
      .select({
        ...eventDetail,
        eventCategory,
        participantsCount: sql<number>`(
          SELECT COUNT(*) FROM ${userEventsSchema}
          WHERE ${userEventsSchema.eventId} = ${eventsSchema.id}
        )`.as('participantsCount'),
      })
      .from(eventsSchema)
      .where(eq(eventsSchema.name, eventName))
      .leftJoin(eventCategoriesSchema, eq(eventsSchema.categoryId, eventCategoriesSchema.id))

    return event[0]
  } catch (err) {
    console.log('getEventByName: ', err)
    throw err
  }
}

export default getEventByName
