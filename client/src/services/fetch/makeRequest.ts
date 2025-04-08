import { z } from 'zod'
import { ApiError } from './apiTypes'

const BASE_URL = 'http://localhost:3020'
const API_URL = `${BASE_URL}/api`

type FetchOptions<TRequestBody, TQueryParams> = {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: TRequestBody
  headers?: Record<string, string>
  queryParams?: TQueryParams
  /* TODO add support for query and path params */
}

// Add this validation schema
const queryParamsSchema = z.object({}).passthrough()

async function makeRequest<TResponse, TBody = undefined, TQueryParams = undefined>(
  options: FetchOptions<TBody, TQueryParams>
): Promise<{ data: TResponse; status: number }> {
  let queryString = ''
  if (options.queryParams) {
    // Validate that queryParams is an object
    try {
      queryParamsSchema.parse(options.queryParams)

      // Convert query params to URL search params
      const searchParams = new URLSearchParams()
      Object.entries(options.queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value))
        }
      })
      queryString = `?${searchParams.toString()}`
    } catch (err) {
      throw new Error('Query parameters must be an object')
    }
  }

  try {
    const response = await fetch(`${API_URL}/${options.url}${queryString}`, {
      method: options.method,
      ...(options.body && { body: JSON.stringify(options.body) }),
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include',
    })

    const dataJson: TResponse = await response.json()

    // Fetch doesnt reject promises even when response is in 400 - 500 range
    if (!response.ok) {
      throw new ApiError({ detail: dataJson })
    }

    return {
      data: dataJson,
      status: response.status,
    }
  } catch (err) {
    if (err instanceof ApiError) {
      throw err
    }

    /* TODO add custom error handling */
    console.log('makeFetch error', err)
    throw err
  }
}

export default makeRequest
