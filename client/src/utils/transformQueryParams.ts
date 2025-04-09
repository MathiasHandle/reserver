import { z } from 'zod'

const queryParamsSchema = z.object({}).passthrough()

function transformQueryParams(queryParams: Record<string, string | number | boolean>) {
  // Validate that queryParams is an object
  try {
    queryParamsSchema.parse(queryParams)

    // Convert query params to URL search params
    const searchParams = new URLSearchParams()

    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value))
      }
    })

    const queryString = `?${searchParams.toString()}`

    return queryString
  } catch (err) {
    throw new Error('Query parameters must be an object')
  }
}

export default transformQueryParams
