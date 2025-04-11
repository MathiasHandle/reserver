import { api } from '@/api'
import { queryClient, queryKeys } from '@/services/reactQuery'
import { useMutation } from '@tanstack/react-query'

function useJoinEvent() {
  return useMutation({
    mutationFn: api.events.joinEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.events.joinedEvents() })
    },
  })
}

export default useJoinEvent
