import type { UsersInsert } from '@/model/users/users'
import usersSchema from '@/model/users/users'
import { db } from '../database'

import { hashPassword } from '@/utils'
import { ValidationError } from '../error'
import getUserByEmail from './getUserByEmail'

async function createUser(newUser: UsersInsert) {
  // Check if user already exists
  const userDb = await getUserByEmail(newUser.email)
  if (userDb) {
    const validationError = new ValidationError({
      message: 'User with this email already exists',
      detail: {
        email: ['User with this email already exists'],
      },
    })
    throw validationError
  }

  const hashedPassword = await hashPassword(newUser.password)

  const userToSave = {
    ...newUser,
    password: hashedPassword,
  }

  await db.insert(usersSchema).values(userToSave)
}

export default createUser
