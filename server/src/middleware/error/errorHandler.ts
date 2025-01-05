import httpCodes from '@/constants/httpCodes'
import { CustomError } from '@/services/error'
import type { NextFunction, Request, Response } from 'express'

const errorHandler = (err: unknown, _: Request, res: Response, next: NextFunction) => {
  // If headers have already been sent, call the next middleware
  if (res.headersSent) {
    next(err)
    return
  }

  // If the error is an instance of CustomError, return the error with the status code
  if (err instanceof CustomError) {
    res.status(err.status).json({
      ...err,
    })
    return
  }

  // If the error is not an instance of CustomError, return an InternalServerError
  if (err instanceof Error) {
    res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
      name: 'INTERNAL_SERVER_ERROR',
      message: err.message,
    })
    return
  }

  // Should not reach this point
  res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
    name: 'INTERNAL_SERVER_ERROR',
    message: 'Internal server error',
  })
}

export default errorHandler
