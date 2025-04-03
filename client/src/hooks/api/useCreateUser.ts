import { api } from '@/api'
import { useMutation } from '@tanstack/react-query'

function useCreateUser() {
  return useMutation({
    mutationFn: api.users.createUser,
  })
}

export default useCreateUser
