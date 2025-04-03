import { usersSchema } from '@/model/users'
import { db } from '@/services/database'
import { eq } from 'drizzle-orm'

async function getUserByEmail(email: string) {
  try {
    const usersData = await db.select().from(usersSchema).where(eq(usersSchema.email, email))

    return usersData[0]
  } catch (err) {
    console.log(err)
  }
}

export default getUserByEmail
