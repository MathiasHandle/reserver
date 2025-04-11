import { makeRequest } from '@/services/fetch'
import type { JoinEventPathParams, JoinEventResponse } from './eventTypes'

async function joinEvent(eventId: number) {
  return await makeRequest<JoinEventResponse, undefined, undefined, JoinEventPathParams>({
    url: 'events/join',
    method: 'POST',
    pathParams: {
      eventId,
    },
  })
}

export default joinEvent
