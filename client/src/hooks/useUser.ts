import { ApiError } from '@/services/fetch/apiTypes'
import { queryClient, queryKeys } from '@/services/reactQuery'
import { useEffect } from 'react'
import useGetUser from './api/user/useGetUser'

function useUser() {
  const { data, error } = useGetUser()

  useEffect(() => {
    if (error instanceof ApiError) {
      if (error.detail.status === 401) {
        queryClient.setQueryData(queryKeys.users.userDetail(), {
          data: { data: { user: null } },
        })
      }
    }
  }, [error])

  return {
    data,
    error,
  }
}

export default useUser
