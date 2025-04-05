import { ApiEmptyResponse } from '@/services/fetch'

type User = {
  id: number
  name: string
  surname: string
  email: string
}

type GetAllUsersResponse = {
  users: User[]
}

type CreateUserRequestBody = {
  name: string
  surname: string
  email: string
  password: string
  confirmPassword: string
}

type CreateUserResponse = ApiEmptyResponse

type LoginUserResponse = {
  user: User
}

type LoginUserRequestBody = {
  email: string
  password: string
}

type GetUserResponse = {
  user: User
}

export type {
  CreateUserRequestBody,
  CreateUserResponse,
  GetAllUsersResponse,
  GetUserResponse,
  LoginUserRequestBody,
  LoginUserResponse,
}
