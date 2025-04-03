import { api } from '@/api'
import { useMutation } from '@tanstack/react-query'

function useLogInUser() {
  return useMutation({
    mutationFn: api.users.loginUser,
  })
}

export default useLogInUser
