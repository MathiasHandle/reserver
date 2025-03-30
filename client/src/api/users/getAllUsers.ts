import { makeRequest } from '@/services/fetch'
import { GetAllUsersResponse } from './userTypes'

async function getAllUsers() {
  return await makeRequest<GetAllUsersResponse, undefined>({
    method: 'GET',
    url: 'users',
  })
}

export default getAllUsers
