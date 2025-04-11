import { api } from '@/api'
import { GetEventCategoriesQueryParams } from '@/api/events/eventTypes'
import { queryKeys } from '@/services/reactQuery'
import { useQuery } from '@tanstack/react-query'

function useGetEventCategories(options?: GetEventCategoriesQueryParams) {
  return useQuery({
    queryKey: queryKeys.events.eventCategories(options),
    queryFn: () => api.events.getEventCategories(options),
    select: data => data.data.categories,
  })
}

export default useGetEventCategories
