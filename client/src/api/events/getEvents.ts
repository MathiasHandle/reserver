import { makeRequest } from '@/services/fetch'
import { GetAllEventsQueryParams, GetAllEventsResponse } from './eventTypes'

async function getEvents(options?: GetAllEventsQueryParams) {
  return await makeRequest<GetAllEventsResponse, undefined, GetAllEventsQueryParams>({
    method: 'GET',
    url: 'events',
    queryParams: options,
  })
}

export default getEvents
