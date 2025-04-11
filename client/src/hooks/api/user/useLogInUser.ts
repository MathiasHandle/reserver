import { api } from '@/api'
import { queryClient, queryKeys } from '@/services/reactQuery'
import { useMutation } from '@tanstack/react-query'

function useLogInUser() {
  return useMutation({
    mutationFn: api.users.loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.userDetail() })
    },
  })
}

export default useLogInUser
