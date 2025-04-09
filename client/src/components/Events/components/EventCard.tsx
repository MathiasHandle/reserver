import { Event } from '@/api/events/eventTypes'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { truncateText } from '@/utils'
import { Link } from '@tanstack/react-router'
import EventCardFooter from './EventCardFooter'

type EventCardProps = {
  event: Event
}

function EventCard(props: EventCardProps) {
  const {
    event: { id, name, description, date, eventCategory, maxCapacity, participantsCount },
  } = props

  return (
    <li>
      <Card className="h-full">
        <Link to={id.toString()} className="grow-1">
          <CardContent>
            <div className="flex gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-amber-400 sm:h-28 sm:w-28">
                photo placeholder
              </div>

              <div>
                <h4 className="text-lg font-bold">{name}</h4>
                <span className="capitalize italic">{eventCategory.name}</span>

                <p className="mt-4">{truncateText(description, 50)}</p>
              </div>
            </div>
          </CardContent>
        </Link>

        <CardFooter>
          <EventCardFooter
            participantsCount={participantsCount}
            date={date}
            maxCapacity={maxCapacity}
          />
        </CardFooter>
      </Card>
    </li>
  )
}

export default EventCard
