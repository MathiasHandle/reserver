import getEventDetail from '@/api/events/getEventDetail'
import { queryKeys } from '@/services/reactQuery'
import { useQuery } from '@tanstack/react-query'

function useGetEventDetail(eventId: number) {
  return useQuery({
    queryKey: queryKeys.events.eventDetail(eventId),
    queryFn: () => getEventDetail(eventId),
    select: data => data.data,
    // TODO remove - just for testing
    retry: false,
  })
}

export default useGetEventDetail
