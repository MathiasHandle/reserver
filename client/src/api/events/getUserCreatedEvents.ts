import { makeRequest } from '@/services/fetch'
import { GetEventsByUserResponse } from './eventTypes'

async function getUserCreatedEvents() {
  return await makeRequest<GetEventsByUserResponse>({
    method: 'GET',
    url: 'events/my-created',
  })
}

export default getUserCreatedEvents
