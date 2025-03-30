import { makeRequest } from '@/services/fetch'
import { CreateUserRequestBody, CreateUserResponse } from './userTypes'

async function createUser(user: CreateUserRequestBody) {
  return await makeRequest<CreateUserResponse, CreateUserRequestBody>({
    method: 'POST',
    url: 'users',
    body: user,
  })
}

export default createUser
