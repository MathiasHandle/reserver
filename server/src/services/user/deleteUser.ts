import { usersSchema } from '@/model/users'
import { db } from '@/services/database'
import { NotFoundError } from '@/services/error'
import { eq } from 'drizzle-orm'
import getUserByIdOrThrow from './getUserByIdOrThrow'

async function deleteUser(userId: number) {
  // check if user exists
  await getUserByIdOrThrow(userId)

  const result = await db.delete(usersSchema).where(eq(usersSchema.id, userId)).returning()

  if (result.length === 0) {
    throw new NotFoundError({
      message: 'User not found',
    })
  }
}

export default deleteUser
