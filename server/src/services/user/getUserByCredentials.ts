import httpCodes from '@/constants/httpCodes'
import type { LoginUserRequestBody } from '@/controllers/users/userTypes'
import { usersSchema } from '@/model/users'
import { db } from '@/services/database'
import type { CustomErrorDetail } from '@/services/error/customError'
import CustomError from '@/services/error/customError'
import { comparePasswords } from '@/utils'
import { eq } from 'drizzle-orm'

class LoginError<T extends CustomErrorDetail> extends CustomError<T> {
  constructor({
    message,
    detail,
    status = httpCodes.BAD_REQUEST,
  }: {
    message: string
    detail: T
    status?: (typeof httpCodes)[keyof typeof httpCodes]
  }) {
    super({ name: 'NOT_FOUND', message, status, detail })
  }
}

async function getUserByCredentials(credentials: LoginUserRequestBody) {
  // Find user by email
  const user = await db
    .select()
    .from(usersSchema)
    .where(eq(usersSchema.email, credentials.email))
    .limit(1)

  if (!user.length) {
    throw new LoginError({
      message: 'Incorrect user credentials',
      status: httpCodes.NOT_FOUND,
      detail: null,
    })
  }

  // Compare passwords that they match
  const isPasswordMatch = await comparePasswords(credentials.password, user[0].password)
  if (!isPasswordMatch) {
    throw new LoginError({
      message: 'Incorrect user credentials',
      status: httpCodes.NOT_FOUND,
      detail: null,
    })
  }

  // Return user data without password
  const { id, name, surname, email } = user[0]

  const userWithoutPassword = {
    id,
    name,
    surname,
    email,
  }

  return userWithoutPassword
}

export default getUserByCredentials
