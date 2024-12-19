import type { CreateUserRequestBody } from '@/controllers/users/userTypes'
import { usersSchema } from '@/model/users'
import { ValidationError } from '@/services/error'
import { createInsertSchema } from 'drizzle-zod'
import type { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

type ErrorDetail = {
  [key: string]: string[]
}

function validateCreateUser(req: Request<{}, {}, CreateUserRequestBody>, _: Response, next: NextFunction) {
  const userSchema = createInsertSchema(usersSchema)

  try {
    userSchema.parse(req.body)
    next()
  } catch (err) {
    if (err instanceof z.ZodError) {
      const validationError = new ValidationError<ErrorDetail>({
        message: 'Invalid data',
        detail: {
          ...err.flatten().fieldErrors,
        },
      })
      return next(validationError)
    }
  }
}

export default validateCreateUser
