import { makeRequest } from '@/services/fetch'
import { CreateEventRequestBody, CreateEventResponse } from './eventTypes'

async function createUser(user: CreateEventRequestBody) {
  return await makeRequest<CreateEventResponse, CreateEventRequestBody>({
    method: 'POST',
    url: 'events',
    body: user,
  })
}

export default createUser
