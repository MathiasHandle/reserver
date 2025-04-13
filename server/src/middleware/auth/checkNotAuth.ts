import httpCodes from '@/constants/httpCodes'
import { ValidationError } from '@/services/error'
import type { NextFunction, Request, Response } from 'express'

function checkNotAuth(req: Request, _res: Response, next: NextFunction) {
  if (req.session && req.session.user) {
    const validationError = new ValidationError({
      message: 'User is already logged in',
      status: httpCodes.CONFLICT,
      detail: null,
    })

    return next(validationError)
  }

  next()
}

export default checkNotAuth
