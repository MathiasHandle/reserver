import { ValidationError } from '@/services/error'
import { getEventCategoryById } from '@/services/events'

async function checkEventCategory(categoryId: number, detailField: string) {
  const eventCategory = await getEventCategoryById(categoryId)

  if (!eventCategory) {
    throw new ValidationError({
      message: 'Event category not found',
      detail: {
        [detailField]: ['Event category not found'],
      },
    })
  }
}

export default checkEventCategory
