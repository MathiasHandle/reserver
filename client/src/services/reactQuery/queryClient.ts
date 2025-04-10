import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
      // 5 minutes
      staleTime: 1000 * 60 * 5,
    },
  },
})

export default queryClient
