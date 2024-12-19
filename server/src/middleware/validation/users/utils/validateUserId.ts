import { z } from 'zod'

/**
 * Validates that the userId is a numeric string
 * @param userId The userId to validate
 */
function validateUserId(userId: string) {
  const userIdSchema = z.string().regex(/^\d+$/, 'userId must be a numeric string')

  userIdSchema.parse(userId)
}

export default validateUserId
