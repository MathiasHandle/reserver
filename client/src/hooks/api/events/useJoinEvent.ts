import { api } from '@/api'
import { queryClient, queryKeys } from '@/services/reactQuery'
import { useMutation } from '@tanstack/react-query'

function useJoinEvent() {
  return useMutation({
    mutationFn: api.events.joinEvent,
    onSuccess: (_, eventId) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.events.joinedEvents() })
      queryClient.invalidateQueries({ queryKey: queryKeys.events.eventDetail(eventId) })
    },
  })
}

export default useJoinEvent
