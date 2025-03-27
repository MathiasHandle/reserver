import type { UserWithoutPassword } from '@/controllers/users/userTypes'
import 'express-session'

declare module 'express-session' {
  interface SessionData {
    user: UserWithoutPassword
  }
}
