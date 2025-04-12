import { ApiEmptyResponse, makeRequest } from '@/services/fetch'
import { DeleteEventPathParams } from './eventTypes'

async function deleteEvent(eventId: number) {
  return await makeRequest<ApiEmptyResponse, undefined, undefined, DeleteEventPathParams>({
    method: 'DELETE',
    url: 'events',
    pathParams: {
      eventId,
    },
  })
}

export default deleteEvent
