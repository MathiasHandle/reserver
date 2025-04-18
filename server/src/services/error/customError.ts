import type httpCodes from '@/constants/httpCodes'

type CustomErrorDetail = {
  [key: string]: unknown
} | null

/**
 * Custom error class, should be used for all errors that are thrown in the application as a base class
 */
class CustomError<T extends CustomErrorDetail> extends Error {
  message: string
  name: string
  status: (typeof httpCodes)[keyof typeof httpCodes]
  detail: T

  constructor({
    message,
    name,
    detail,
    status,
  }: {
    message: string
    name: string
    status: (typeof httpCodes)[keyof typeof httpCodes]
    detail: T
  }) {
    super(message)

    this.message = message
    this.name = name
    this.status = status
    this.detail = detail
  }
}

export default CustomError

export type { CustomErrorDetail }
