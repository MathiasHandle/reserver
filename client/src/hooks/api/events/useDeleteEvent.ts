import { api } from '@/api'
import { queryClient, queryKeys } from '@/services/reactQuery'
import { useMutation } from '@tanstack/react-query'

function useDeleteEvent() {
  return useMutation({
    mutationFn: api.events.deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.events.eventList() })
      queryClient.invalidateQueries({ queryKey: queryKeys.events.userCreatedEvents() })
    },
  })
}

export default useDeleteEvent
