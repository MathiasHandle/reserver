import httpCodes from '@/constants/httpCodes'
import type { CustomErrorDetail } from './customError'
import CustomError from './customError'

class NotFoundError<T extends CustomErrorDetail> extends CustomError<T | null> {
  constructor({ message, detail }: { message: string; detail?: T }) {
    super({
      name: 'NOT_FOUND',
      message,
      status: httpCodes.NOT_FOUND,
      detail: detail ?? null,
    })
  }
}

export default NotFoundError
