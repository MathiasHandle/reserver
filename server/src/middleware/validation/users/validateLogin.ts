import httpCodes from '@/constants/httpCodes'
import type { LoginUserRequestBody, LoginUserResponse } from '@/controllers/users/userTypes'
import { ValidationError } from '@/services/error'
import type { ApiEmptyPathParams, TypedRequest } from '@/types/sharedTypes'
import type { NextFunction, Response } from 'express'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Invalid email format').toLowerCase(),
  password: z.string().min(1, 'Password is required'),
})

function validateLogin(
  req: TypedRequest<ApiEmptyPathParams, LoginUserRequestBody>,
  _: Response<LoginUserResponse>,
  next: NextFunction
) {
  try {
    loginSchema.parse(req.body)
    next()
  } catch (err) {
    if (err instanceof z.ZodError) {
      const validationError = new ValidationError({
        message: 'Invalid login credentials',
        detail: err.flatten().fieldErrors,
        status: httpCodes.BAD_REQUEST,
      })

      return next(validationError)
    }

    next(err)
  }
}

export default validateLogin
