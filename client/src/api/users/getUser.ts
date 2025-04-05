import { makeRequest } from '@/services/fetch'
import { GetUserResponse } from './userTypes'

async function getUser() {
  return await makeRequest<GetUserResponse>({
    method: 'GET',
    url: 'users/me',
  })
}

export default getUser
