import type { GetUserByIdPathParams } from '@/controllers/users/userTypes'
import validateUserId from './utils/validateUserId'
import { ValidationError } from '@/services/error'
import type { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

type ErrorDetail = {
  message: string
}

function validateUserIdPath(req: Request<GetUserByIdPathParams>, _: Response, next: NextFunction) {
  try {
    validateUserId(req.params.userId)

    next()
  } catch (err) {
    if (err instanceof z.ZodError) {
      const validationError = new ValidationError<ErrorDetail>({
        message: 'Invalid userId',
        detail: {
          message: err.errors[0].message,
        },
      })
      next(validationError)
      return
    }

    next(err)
  }
}

export default validateUserIdPath
