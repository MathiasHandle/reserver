import { makeRequest } from '@/services/fetch'
import { GetJoinedEventsResponse } from './eventTypes'

async function getJoinedEvents() {
  return await makeRequest<GetJoinedEventsResponse>({
    url: 'events/my-joined',
    method: 'GET',
  })
}

export default getJoinedEvents
