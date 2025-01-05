import httpCodes from '@/constants/httpCodes'
import type { CustomErrorDetail } from './customError';
import CustomError from './customError'

class NotFoundError<T extends CustomErrorDetail> extends CustomError<T> {
  constructor({
    message,
    detail,
    status = httpCodes.BAD_REQUEST,
  }: {
    message: string
    detail: T
    status?: (typeof httpCodes)[keyof typeof httpCodes]
  }) {
    super({ name: 'NOT_FOUND', message, status, detail })
  }
}

export default NotFoundError
