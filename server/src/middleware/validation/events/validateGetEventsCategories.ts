import type { GetEventCategoriesQueryParams } from '@/controllers/events/eventTypes'
import { ValidationError } from '@/services/error'
import type { TypedRequest } from '@/types/sharedTypes'
import type { NextFunction, Response } from 'express'

const validateGetEventCategories = (
  req: TypedRequest<undefined, undefined, GetEventCategoriesQueryParams>,
  _res: Response,
  next: NextFunction
) => {
  const { sort, limit } = req.query

  const convertedQuery: GetEventCategoriesQueryParams = {}

  if (sort) {
    if (sort !== 'asc' && sort !== 'desc') {
      return next(
        new ValidationError({
          message: 'Sort must be either asc or desc',
          detail: null,
        })
      )
    }
  }

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

  req.query = { ...req.query, ...convertedQuery }

  next()
}

export default validateGetEventCategories
