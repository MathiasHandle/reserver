import { api } from '@/api'
import { queryKeys } from '@/services/reactQuery'
import { useQuery } from '@tanstack/react-query'

function useGetUser() {
  return useQuery({
    queryKey: queryKeys.users.userDetail(),
    queryFn: api.users.getUser,
    select: data => data.data.user,
    retry: false,
  })
}

export default useGetUser
