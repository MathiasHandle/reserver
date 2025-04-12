import { makeRequest } from '@/services/fetch'
import { EditEventPathParams, EditEventRequestBody, EditEventResponse } from './eventTypes'

async function editEvent(event: EditEventRequestBody) {
  return await makeRequest<EditEventResponse, EditEventRequestBody, undefined, EditEventPathParams>(
    {
      method: 'PUT',
      url: 'events',
      body: event,
      pathParams: {
        eventId: event.id,
      },
    }
  )
}

export default editEvent
