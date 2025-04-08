import { makeRequest } from '@/services/fetch'
import { GetEventCategoriesQueryParams, GetEventCategoriesResponse } from './eventTypes'

async function getEventCategories(options?: GetEventCategoriesQueryParams) {
  return await makeRequest<GetEventCategoriesResponse, undefined, GetEventCategoriesQueryParams>({
    method: 'GET',
    url: 'events/categories',
    queryParams: options,
  })
}

export default getEventCategories
