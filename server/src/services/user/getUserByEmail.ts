import { usersSchema } from '@/model/users'
import { db } from '@/services/database'
import { eq } from 'drizzle-orm'

async function getUserByEmail(email: string) {
  const usersData = await db.select().from(usersSchema).where(eq(usersSchema.email, email))

  return usersData[0]
}

export default getUserByEmail
