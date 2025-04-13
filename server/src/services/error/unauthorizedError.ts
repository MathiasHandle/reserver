import httpCodes from '@/constants/httpCodes'
import type { CustomErrorDetail } from './customError'
import CustomError from './customError'

class UnauthorizedError<T extends CustomErrorDetail> extends CustomError<T | null> {
  constructor({ message = 'Unauthorized', detail }: { detail?: T; message?: string } = {}) {
    super({
      name: 'UNAUTHORIZED_ERROR',
      message,
      detail: detail ?? null,
      status: httpCodes.UNAUTHORIZED,
    })
  }
}

export default UnauthorizedError
