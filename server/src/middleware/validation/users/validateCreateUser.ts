import type { CreateUserRequestBody } from '@/controllers/users/userTypes'
import { ValidationError } from '@/services/error'
import type { EmptyObject, TypedRequest } from '@/types/sharedTypes'
import type { NextFunction, Response } from 'express'
import { z } from 'zod'

type ErrorDetail = {
  [key: string]: string[] | undefined
}

const createUserSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters long').max(50, 'Name is too long'),
    surname: z
      .string()
      .min(2, 'Surname must be at least 2 characters long')
      .max(50, 'Surname is too long'),
    email: z.string().email('Invalid email format').toLowerCase(),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(100, 'Password is too long')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      ),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

async function validateCreateUser(
  req: TypedRequest<EmptyObject, CreateUserRequestBody>,
  _: Response,
  next: NextFunction
) {
  try {
    createUserSchema.parse(req.body)

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
