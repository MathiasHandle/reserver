import { transformPathParams, transformQueryParams } from '@/utils'
import { ApiError } from './apiTypes'

const BASE_URL = import.meta.env.VITE_SERVER_URL
const API_URL = `${BASE_URL}/api`

type FetchOptions<TRequestBody, TQueryParams, TPathParams> = {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: TRequestBody
  headers?: Record<string, string>
  queryParams?: TQueryParams
  pathParams?: TPathParams
}

async function makeRequest<
  TResponse,
  TBody = undefined,
  TQueryParams = undefined,
  TPathParams = undefined,
>(
  options: FetchOptions<TBody, TQueryParams, TPathParams>
): Promise<{ data: TResponse; status: number }> {
  let queryString = ''
  if (options.queryParams) {
    queryString = transformQueryParams(options.queryParams)
  }

  let pathString = ''
  if (options.pathParams) {
    pathString = transformPathParams(options.pathParams)
  }

  try {
    const response = await fetch(`${API_URL}/${options.url}${pathString}${queryString}`, {
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
