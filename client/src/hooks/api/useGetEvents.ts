import { api } from '@/api'
import { GetAllEventsQueryParams } from '@/api/events/eventTypes'
import { queryKeys } from '@/services/reactQuery'
import { useQuery } from '@tanstack/react-query'

function useGetEvents(options?: GetAllEventsQueryParams) {
  return useQuery({
    queryKey: queryKeys.events.eventList(),
    queryFn: () => api.events.getAllEvents(options),
    select: data => data.data,
  })
}

export default useGetEvents
