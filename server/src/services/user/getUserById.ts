import { usersSchema } from '@/model/users'
import { eq } from 'drizzle-orm'
import { db } from '../database'

async function getUserById(userId: number) {
  const user = await db.select().from(usersSchema).where(eq(usersSchema.id, userId))

  return user[0]
}

export default getUserById
