type ApiEmptyResponse = Record<string, never>

class ApiError<T> extends Error {
  message: string
  detail: T

  constructor({ message, detail }: { message?: string; detail: T }) {
    super(message)
    this.message = 'API error'
    this.detail = detail
  }
}

export { ApiError }

export type { ApiEmptyResponse }
