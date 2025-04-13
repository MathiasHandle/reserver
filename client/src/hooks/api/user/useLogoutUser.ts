import { api } from '@/api'
import { queryClient, queryKeys } from '@/services/reactQuery'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'

function useLogoutUser() {
  const router = useRouter()

  return useMutation({
    mutationFn: api.users.logoutUser,
    onSuccess: () => {
      // Will fail with http 401, but just to be sure
      queryClient.invalidateQueries({ queryKey: queryKeys.users.userDetail() })

      queryClient.setQueriesData({ queryKey: queryKeys.events.myEvents() }, null)

      router.navigate({ to: '/' })
    },
  })
}

export default useLogoutUser
