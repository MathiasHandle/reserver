import type { Event } from '@/controllers/events/eventTypes'
import { eventCategoriesSchema } from '@/model/eventCategories'
import { eventsSchema } from '@/model/events'
import { userEventsSchema } from '@/model/userEvents'
import { db } from '@/services/database'
import { eq, getTableColumns, sql } from 'drizzle-orm'

async function getEventById(eventId: number): Promise<Event | undefined> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { categoryId, ...eventDetail } = getTableColumns(eventsSchema)
  const eventCategory = getTableColumns(eventCategoriesSchema)

  const eventData = await db
    .select({
      ...eventDetail,
      eventCategory,
      participantsCount: sql<number>`(
          SELECT COUNT(*) FROM ${userEventsSchema}
          WHERE ${userEventsSchema.eventId} = ${eventsSchema.id}
        )`.as('participantsCount'),
    })
    .from(eventsSchema)
    .where(eq(eventsSchema.id, eventId))
    .leftJoin(eventCategoriesSchema, eq(eventsSchema.categoryId, eventCategoriesSchema.id))

  return eventData[0]
}

export default getEventById
