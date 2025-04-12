import { ValidationError } from '@/services/error'

function checkFutureDateTime(date: Date, detailField: string) {
  const now = new Date()

  if (date < now) {
    const validationError = new ValidationError({
      message: 'Date and time cannot be in the past',
      detail: {
        [detailField]: ['Date and time cannot be in the past'],
      },
    })

    throw validationError
  }
}

export default checkFutureDateTime
