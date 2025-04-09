import { eventCategoriesSchema } from '@/model/eventCategories'
import { eventsSchema } from '@/model/events'
import { db } from '@/services/database'
import { eq, getTableColumns } from 'drizzle-orm'

async function getEventById(eventId: number) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hostId, categoryId, ...eventDetail } = getTableColumns(eventsSchema)
    const eventCategory = getTableColumns(eventCategoriesSchema)

    const eventData = await db
      .select({
        ...eventDetail,
        eventCategory,
      })
      .from(eventsSchema)
      .where(eq(eventsSchema.id, eventId))
      .leftJoin(eventCategoriesSchema, eq(eventsSchema.categoryId, eventCategoriesSchema.id))

    return eventData[0]
  } catch (err) {
    console.log(err)
  }
}

export default getEventById
