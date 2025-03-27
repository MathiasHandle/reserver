import type { UsersInsert } from '@/model/users/users'
import usersSchema from '@/model/users/users'
import { db } from '../database'

import { hashPassword } from '@/utils'

async function createUser(newUser: UsersInsert) {
  try {
    const hashedPassword = await hashPassword(newUser.password)

    const userToSave = {
      ...newUser,
      password: hashedPassword,
    }

    await db.insert(usersSchema).values(userToSave)
  } catch (err) {
    console.error('ERROR: ', err)
  }
}

export default createUser
