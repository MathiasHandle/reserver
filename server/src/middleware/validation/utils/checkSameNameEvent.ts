import { ValidationError } from '@/services/error'
import { getEventByName } from '@/services/events'

async function checkSameNameEvent(name: string, detailField: string) {
  const event = await getEventByName(name)

  if (event) {
    const validationError = new ValidationError({
      message: 'Event with same name already exists',
      detail: {
        [detailField]: ['Event with same name already exists'],
      },
    })

    throw validationError
  }
}

export default checkSameNameEvent
