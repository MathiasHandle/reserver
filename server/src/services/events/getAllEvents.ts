import type { EventWithCategory, GetAllEventsQueryParams } from '@/controllers/events/eventTypes'
import { eventCategoriesSchema } from '@/model/eventCategories'
import { eventsSchema } from '@/model/events'
import { db } from '@/services/database'
import { eq, getTableColumns } from 'drizzle-orm'

async function getAllEvents(
  options?: GetAllEventsQueryParams
): Promise<EventWithCategory[] | undefined> {
  const defaultOptions = {
    limit: 20,
    offset: 0,
    categoryId: undefined,
  }

  const { limit, offset, categoryId: categoryIdFilter } = { ...defaultOptions, ...options }

  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { categoryId, hostId, ...eventRest } = getTableColumns(eventsSchema)
    const eventCategory = getTableColumns(eventCategoriesSchema)

    const eventsData = await db
      .select({ ...eventRest, eventCategory })
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
