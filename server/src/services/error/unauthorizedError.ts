import type httpCodes from '@/constants/httpCodes'
import type { CustomErrorDetail } from './customError'
import CustomError from './customError'

class UnauthorizedError<T extends CustomErrorDetail> extends CustomError<T> {
  constructor({
    detail,
    status,
  }: {
    detail: T
    status: (typeof httpCodes)[keyof typeof httpCodes]
  }) {
    super({ name: 'UNAUTHORIZED_ERROR', message: 'Unauthorized', detail, status })
  }
}

export default UnauthorizedError
