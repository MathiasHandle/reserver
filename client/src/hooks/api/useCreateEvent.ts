import { api } from '@/api'
import { queryClient, queryKeys } from '@/services/reactQuery'
import { useMutation } from '@tanstack/react-query'

function useCreateEvent() {
  return useMutation({
    mutationFn: api.events.createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.events.eventList() })
      queryClient.invalidateQueries({ queryKey: queryKeys.events.userCreatedEvents() })
    },
  })
}

export default useCreateEvent
