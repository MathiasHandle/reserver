import { makeRequest } from '@/services/fetch'
import { LoginUserRequestBody, LoginUserResponse } from './userTypes'

async function loginUser(user: LoginUserRequestBody) {
  return await makeRequest<LoginUserResponse, LoginUserRequestBody>({
    method: 'POST',
    url: 'users/login',
    body: user,
  })
}

export default loginUser
