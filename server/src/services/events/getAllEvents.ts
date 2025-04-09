import type { Event, GetAllEventsQueryParams } from '@/controllers/events/eventTypes'
import { eventCategoriesSchema } from '@/model/eventCategories'
import { eventsSchema } from '@/model/events'
import { userEventsSchema } from '@/model/userEvents'
import { db } from '@/services/database'
import { eq, getTableColumns, sql } from 'drizzle-orm'

async function getAllEvents(options?: GetAllEventsQueryParams): Promise<Event[] | undefined> {
  const defaultOptions = {
    limit: 20,
    offset: 0,
    categoryId: undefined,
  }

  const { limit, offset, categoryId: categoryIdFilter } = { ...defaultOptions, ...options }

  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { categoryId, ...eventRest } = getTableColumns(eventsSchema)
    const eventCategory = getTableColumns(eventCategoriesSchema)

    const eventsData = await db
      .select({
        ...eventRest,
        eventCategory,
        participantsCount: sql<number>`(
        SELECT COUNT(*) FROM ${userEventsSchema}
        WHERE ${userEventsSchema.eventId} = ${eventsSchema.id}
      )`.as('participantsCount'),
      })
      .from(eventsSchema)
      .leftJoin(eventCategoriesSchema, eq(eventsSchema.categoryId, eventCategoriesSchema.id))
      .limit(limit)
      .offset(offset)
      .where(categoryIdFilter ? eq(eventsSchema.categoryId, categoryIdFilter) : undefined)

    return eventsData
  } catch (err) {
    console.log(err)
  }
}

export default getAllEvents
