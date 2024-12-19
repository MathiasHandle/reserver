import type { User } from '@/model/users'
import { UsersInsert } from '@/model/users/users'
import { APIEmptyResponse } from '@/types/sharedTypes'

type GetAllUsersResponse = {
  users: User[]
}

type GetUserByIdPathParams = {
  userId: string
}

type GetUserByIdResponse = {
  user: User
}

type CreateUserRequestBody = UsersInsert

type CreateUserResponse = APIEmptyResponse

type DeleteUserPathParams = {
  userId: string
}

type DeleteUserResponse = APIEmptyResponse

export type {
  GetAllUsersResponse,
  GetUserByIdPathParams,
  GetUserByIdResponse,
  CreateUserRequestBody,
  CreateUserResponse,
  DeleteUserPathParams,
  DeleteUserResponse,
}
