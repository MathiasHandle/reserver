import { NotFoundError } from '../error'
import getUserById from './getUserById'

async function getUserByIdOrThrow(userId: number) {
  const user = await getUserById(userId)

  if (!user) {
    throw new NotFoundError({
      message: 'User not found',
    })
  }

  return user
}

export default getUserByIdOrThrow
