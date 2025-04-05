import { ApiError } from './apiTypes'

const BASE_URL = 'http://localhost:3020'
const API_URL = `${BASE_URL}/api`

type FetchOptions<TRequestBody> = {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: TRequestBody
  headers?: Record<string, string>
  /* TODO add support for query and path params */
}

async function makeRequest<TResponse, TBody = undefined>(
  options: FetchOptions<TBody>
): Promise<{ data: TResponse; status: number }> {
  try {
    const response = await fetch(`${API_URL}/${options.url}`, {
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
