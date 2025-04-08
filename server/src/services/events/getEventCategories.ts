import type { GetEventCategoriesQueryParams } from '@/controllers/events/eventTypes'
import { eventCategoriesSchema } from '@/model/eventCategories'
import { eventsSchema } from '@/model/events'
import { db } from '@/services/database'
import { asc, desc, eq, sql } from 'drizzle-orm'

async function getEventCategories(options?: GetEventCategoriesQueryParams) {
  const defaultOptions = {
    sort: 'desc',
    // negative number is used to get all categories
    limit: -1,
  }

  const { sort, limit } = { ...defaultOptions, ...options }

  try {
    const categories = await db
      .select({
        id: eventCategoriesSchema.id,
        name: eventCategoriesSchema.name,
        eventCount: sql<number>`COALESCE(count(${eventsSchema.id}), 0)`.as('eventCount'),
      })
      .from(eventCategoriesSchema)
      .leftJoin(eventsSchema, eq(eventCategoriesSchema.id, eventsSchema.categoryId))
      .groupBy(eventCategoriesSchema.id, eventCategoriesSchema.name)
      .orderBy(sort === 'asc' ? asc(sql`eventCount`) : desc(sql`eventCount`))
      .limit(limit)

    return categories
  } catch (err) {
    console.log(err)
  }
}

export default getEventCategories
