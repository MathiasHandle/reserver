import { ApiEmptyResponse, makeRequest } from '@/services/fetch'

async function logoutUser() {
  return await makeRequest<ApiEmptyResponse>({
    method: 'POST',
    url: 'users/logout',
  })
}

export default logoutUser
