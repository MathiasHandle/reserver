import { UnauthorizedError } from '@/services/error'
import type { NextFunction, Request, Response } from 'express'

function checkAuth(req: Request, _res: Response, next: NextFunction) {
  if (!req.session || !req.session.user) {
    const unauthorizedError = new UnauthorizedError()

    next(unauthorizedError)
    return
  }

  next()
}

export default checkAuth
