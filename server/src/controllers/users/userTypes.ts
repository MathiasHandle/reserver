import type { User } from '@/model/users'
import type { UsersInsert } from '@/model/users/users'
import type { APIEmptyResponse } from '@/types/sharedTypes'

type GetAllUsersResponse = {
  users: User[]
}

type GetUserByIdPathParams = {
  userId: string
}

type GetUserByIdResponse = {
  user: User
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

export type {
  CreateUserRequestBody,
  CreateUserResponse,
  DeleteUserPathParams,
  DeleteUserResponse,
  GetAllUsersResponse,
  GetUserByIdPathParams,
  GetUserByIdResponse,
  LoginUserRequestBody,
}
