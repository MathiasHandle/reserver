import { usersSchema } from '@/model/users'
import { UsersInsert } from '@/model/users/users'
import { db } from '@/services/database'

async function createUser(newUser: UsersInsert) {
  try {
    await db.insert(usersSchema).values(newUser)
  } catch (err) {
    console.error(err)
  }
}

export default createUser
