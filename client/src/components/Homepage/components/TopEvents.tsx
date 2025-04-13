import { EventCard, EventListGhost } from '@/components/Events'
import { useGetEvents } from '@/hooks'

function TopEvents() {
  const { data: events, isFetching } = useGetEvents({
    limit: 6,
    sort: 'desc',
  })

  // FIXME return select  -> data.events.events

  return (
    <>
      {isFetching && <EventListGhost numberOfEvents={6} />}

      {events && (
        <ul className="grid grid-cols-1 gap-2 px-4 sm:gap-x-6 sm:gap-y-4 sm:px-0 md:gap-x-8 lg:grid-cols-2 xl:grid-cols-3">
          <>
            {events.events.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </>
        </ul>
      )}
    </>
  )
}

export default TopEvents
