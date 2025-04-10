import { eq } from 'drizzle-orm'

import { eventCategoriesSchema } from '@/model/eventCategories'
import { db } from '../database'

async function getEventCategoryById(id: number) {
  try {
    const eventCategory = await db
      .select()
      .from(eventCategoriesSchema)
      .where(eq(eventCategoriesSchema.id, id))

    return eventCategory[0]
  } catch (err) {
    console.log('getEventCategoryById: ', err)
    throw err
  }
}

export default getEventCategoryById
