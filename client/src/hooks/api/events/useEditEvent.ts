import { api } from '@/api'
import { queryClient, queryKeys } from '@/services/reactQuery'
import { useMutation } from '@tanstack/react-query'

function useEditEvent() {
  return useMutation({
    mutationFn: api.events.editEvent,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.events.eventList() })
      queryClient.invalidateQueries({ queryKey: queryKeys.events.userCreatedEvents() })
      queryClient.invalidateQueries({ queryKey: queryKeys.events.eventDetail(variables.id) })
    },
  })
}

export default useEditEvent
