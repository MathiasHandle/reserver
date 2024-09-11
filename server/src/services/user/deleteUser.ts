import { usersSchema } from '@/model/users'
import { db } from '@/services/database'
import { eq } from 'drizzle-orm'

async function deleteUser(userId: number) {
  try {
    await db.delete(usersSchema).where(eq(usersSchema.id, userId)).returning()
  } catch (err) {
    console.log(err)
  }
}

export default deleteUser
