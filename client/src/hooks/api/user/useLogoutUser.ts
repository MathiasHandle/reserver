import { api } from '@/api'
import { queryClient, queryKeys } from '@/services/reactQuery'
import { useMutation } from '@tanstack/react-query'

function useLogoutUser(onSuccess?: () => void) {
  return useMutation({
    mutationFn: api.users.logoutUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.userDetail() })
      queryClient.setQueriesData({ queryKey: queryKeys.events.myEvents() }, null)
      onSuccess?.()
    },
  })
}

export default useLogoutUser
