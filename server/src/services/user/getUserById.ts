import { usersSchema } from '@/model/users'
import { db } from '@/services/database'
import { eq } from 'drizzle-orm'

async function getUserById(userId: number) {
  try {
    const usersData = await db.select().from(usersSchema).where(eq(usersSchema.id, userId))

    return usersData[0]
  } catch (err) {
    console.log(err)
  }
}

export default getUserById
