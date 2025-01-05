import httpCodes from '@/constants/httpCodes'
import CustomError, { CustomErrorDetail } from './customError'

class ValidationError<T extends CustomErrorDetail> extends CustomError<T> {
  constructor({
    message,
    detail,
    status = httpCodes.BAD_REQUEST,
  }: {
    message: string
    detail: T
    status?: (typeof httpCodes)[keyof typeof httpCodes]
  }) {
    super({ name: 'VALIDATION_ERROR', message, status, detail })
  }
}

export default ValidationError
