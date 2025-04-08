import type { GetAllEventsQueryParams } from '@/controllers/events/eventTypes'
import { ValidationError } from '@/services/error'
import type { TypedRequest } from '@/types/sharedTypes'
import type { NextFunction, Response } from 'express'

const validateEventQueryParams = (
  req: TypedRequest<undefined, undefined, GetAllEventsQueryParams>,
  _res: Response,
  next: NextFunction
) => {
  const { limit, offset, categoryId } = req.query

  // Create an object to store converted values
  // query params are strings by default
  const convertedQuery: GetAllEventsQueryParams = {}

  // Validate and convert limit
  if (limit) {
    const limitNum = Number(limit)

    if (!Number.isInteger(limitNum)) {
      return next(
        new ValidationError({
          message: 'Limit must be an integer',
          detail: null,
        })
      )
    }
    if (limitNum < 1) {
      return next(
        new ValidationError({
          message: 'Limit must be a positive integer',
          detail: null,
        })
      )
    }
    if (limitNum > 50) {
      return next(
        new ValidationError({
          message: 'Limit must be 50 or less',
          detail: null,
        })
      )
    }

    convertedQuery.limit = limitNum
  }

  // Validate and convert offset
  if (offset) {
    const offsetNum = Number(offset)

    if (!Number.isInteger(offsetNum) || offsetNum < 0) {
      return next(
        new ValidationError({
          message: 'Offset must be a non-negative integer',
          detail: null,
        })
      )
    }

    convertedQuery.offset = offsetNum
  }

  // Validate and convert categoryId
  if (categoryId) {
    const categoryIdNum = Number(categoryId)

    if (!Number.isInteger(categoryIdNum)) {
      return next(
        new ValidationError({
          message: 'Category ID must be an integer',
          detail: null,
        })
      )
    }

    convertedQuery.categoryId = categoryIdNum
  }

  // Replace the original query string values with converted numeric values
  req.query = convertedQuery

  next()
}

export default validateEventQueryParams
