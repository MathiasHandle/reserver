import { z } from 'zod'

const pathParamsSchema = z.object({}).passthrough()

function transformPathParams(pathParams: Record<string, string | number | boolean>) {
  let pathString = ''

  // Validate that pathParams is an object
  try {
    pathParamsSchema.parse(pathParams)

    // Get the values of the path parameters
    const paramValues = Object.values(pathParams).filter(
      value => value !== undefined && value !== null
    )

    // Join the values with '/' and prepend a '/'
    pathString = paramValues.length > 0 ? `/${paramValues.join('/')}` : ''
  } catch {
    throw new Error('Path parameters must be an object')
  }

  return pathString
}

export default transformPathParams
