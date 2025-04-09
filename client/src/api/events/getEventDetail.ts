import { makeRequest } from '@/services/fetch'
import { GetEventDetailPathParams, GetEventDetailResponse } from './eventTypes'

async function getEventDetail(eventId: number) {
  return await makeRequest<GetEventDetailResponse, undefined, undefined, GetEventDetailPathParams>({
    method: 'GET',
    url: 'events',
    pathParams: {
      eventId: eventId,
    },
  })
}

export default getEventDetail
