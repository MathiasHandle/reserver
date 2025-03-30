import { ApiEmptyResponse } from '@/services/fetch'

type GetAllUsersResponse = {
  users: {
    id: number
    name: string
    surname: string
    email: string
  }[]
}

type CreateUserRequestBody = {
  name: string
  surname: string
  email: string
  password: string
  confirmPassword: string
}

type CreateUserResponse = ApiEmptyResponse

export type { CreateUserRequestBody, CreateUserResponse, GetAllUsersResponse }
