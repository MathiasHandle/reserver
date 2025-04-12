import { makeRequest } from '@/services/fetch'
import { CreateEventRequestBody, CreateEventResponse } from './eventTypes'

async function createEvent(event: CreateEventRequestBody) {
  return await makeRequest<CreateEventResponse, CreateEventRequestBody>({
    method: 'POST',
    url: 'events',
    body: event,
  })
}

export default createEvent
