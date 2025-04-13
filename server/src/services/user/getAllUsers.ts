import { usersSchema } from '@/model/users'
import { db } from '@/services/database'

async function getAllUsers() {
  const usersData = await db.select().from(usersSchema)

  return usersData
}

export default getAllUsers
