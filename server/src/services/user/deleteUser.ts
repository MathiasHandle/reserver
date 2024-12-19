import { usersSchema } from '@/model/users'
import { db } from '@/services/database'
import { eq } from 'drizzle-orm'
import { NotFoundError } from '@/services/error'

async function deleteUser(userId: number) {
  const result = await db.delete(usersSchema).where(eq(usersSchema.id, userId)).returning()

  if (result.length === 0) {
    throw new NotFoundError({
      message: 'User not found',
      detail: null,
    })
  }
}

export default deleteUser
