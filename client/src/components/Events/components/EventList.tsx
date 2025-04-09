import { Event } from '@/api/events/eventTypes'
import EventCard from './EventCard'

type EventListProps = {
  events: Event[]
}

function EventList(props: EventListProps) {
  return (
    <>
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {props.events.map(event => (
          <EventCard event={event} key={event.id} />
        ))}
      </ul>
    </>
  )
}

export default EventList
