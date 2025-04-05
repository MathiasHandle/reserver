type ApiEmptyResponse = Record<string, never>

class ApiError<TDetail> extends Error {
  message: string
  detail: TDetail

  constructor({ message, detail }: { message?: string; detail: TDetail }) {
    super(message)
    this.message = 'API error'
    this.detail = detail
  }
}

export { ApiError }

export type { ApiEmptyResponse }
