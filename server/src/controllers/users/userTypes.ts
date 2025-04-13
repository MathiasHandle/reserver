import type { User } from '@/model/users'
import type { UsersInsert } from '@/model/users/users'
import type { APIEmptyResponse } from '@/types/sharedTypes'
import type { SessionData } from 'express-session'

type GetAllUsersResponse = {
  users: User[]
}

type CreateUserRequestBody = Omit<UsersInsert, 'id'> & {
  confirmPassword: string
}

type CreateUserResponse = APIEmptyResponse

type DeleteUserPathParams = {
  userId: string
}

type DeleteUserResponse = APIEmptyResponse

type LoginUserRequestBody = {
  email: string
  password: string
}

type UserWithoutPassword = Omit<User, 'password'>

type LoginUserResponse = { user: UserWithoutPassword }

type CheckAuthResponse = { user: SessionData['user'] }

export type {
  CheckAuthResponse,
  CreateUserRequestBody,
  CreateUserResponse,
  DeleteUserPathParams,
  DeleteUserResponse,
  GetAllUsersResponse,
  LoginUserRequestBody,
  LoginUserResponse,
  UserWithoutPassword,
}
