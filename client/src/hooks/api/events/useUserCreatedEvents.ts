import { api } from '@/api'
import { queryKeys } from '@/services/reactQuery'
import { useQuery } from '@tanstack/react-query'

function useUserCreatedEvents() {
  return useQuery({
    queryKey: queryKeys.events.userCreatedEvents(),
    queryFn: api.events.getUserCreatedEvents,
    select: data => data.data.events,
  })
}

export default useUserCreatedEvents
