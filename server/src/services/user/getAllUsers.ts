import { usersSchema } from '@/model/users'
import { db } from '@/services/database'

async function getAllUsers() {
  try {
    const usersData = await db.select().from(usersSchema)

    return usersData
  } catch (err) {
    console.log(err)
  }
}

export default getAllUsers
