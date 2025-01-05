import type { CreateUserRequestBody } from '@/controllers/users/userTypes'
import { usersSchema } from '@/model/users'
import { ValidationError } from '@/services/error'
import type { EmptyObject, TypedRequest } from '@/types/sharedTypes'
import { createInsertSchema } from 'drizzle-zod'
import type { NextFunction, Response } from 'express'
import { z } from 'zod'

type ErrorDetail = {
  [key: string]: string[] | undefined
}

function validateCreateUser(req: TypedRequest<EmptyObject, CreateUserRequestBody>, _: Response, next: NextFunction) {
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
