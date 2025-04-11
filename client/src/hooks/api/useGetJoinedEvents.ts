import { api } from '@/api'
import { queryKeys } from '@/services/reactQuery'
import { useQuery } from '@tanstack/react-query'

function useGetJoinedEvents(enabled: boolean) {
  return useQuery({
    queryKey: queryKeys.events.joinedEvents(),
    queryFn: api.events.getJoinedEvents,
    select: data => data.data.events,
    enabled,
  })
}

export default useGetJoinedEvents
