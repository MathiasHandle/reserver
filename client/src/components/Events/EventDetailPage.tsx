import {
  useGetEventDetail,
  useGetJoinedEvents,
  useJoinEvent,
  useUser,
  useUserCreatedEvents,
} from '@/hooks'
import { Link } from '@tanstack/react-router'
import { Button } from '../ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import EventCardFooter from './components/EventCardFooter'
import EventDetailGhost from './components/EventDetailGhost'

type EventDetailPageProps = {
  eventId: number
}

function EventDetailPage({ eventId }: EventDetailPageProps) {
  const { data, isFetching } = useGetEventDetail(eventId)
  const { mutate: joinEvent } = useJoinEvent()

  const { data: user } = useUser()
  const { data: joinedEvents } = useGetJoinedEvents(!!user)
  const { data: createdEvents } = useUserCreatedEvents(!!user)

  const isJoined = joinedEvents?.some(event => event.id === eventId)
  const isOwner = createdEvents?.some(event => event.id === eventId)

  return (
    <>
      <Link
        to="/events"
        search={{ categoryId: -1, sort: 'desc' }}
        className="mx-auto mt-4 block w-fit sm:mx-0"
      >
        <Button variant={'destructive'}>Back to events</Button>
      </Link>

      {isFetching && !data && <EventDetailGhost />}

      <article className="m-4 w-fit sm:my-8 lg:mx-auto">
        {data && (
          <>
            <Card className="max-w-[800px]">
              <CardHeader>
                <h1 className="text-center text-2xl font-bold">{data.event.name}</h1>
              </CardHeader>

              <CardContent className="flex flex-col gap-8 lg:flex-row">
                <div className="flex h-64 w-full items-center justify-center rounded-xl bg-amber-400 text-xl font-bold lg:grow lg:basis-1/2">
                  image placeholder
                </div>

                <div className="lg:grow lg:basis-1/2">
                  <p>
                    {data.event.description} Lorem ipsum dolor sit amet, consectetuer adipiscing
                    elit. Pellentesque ipsum. Etiam posuere lacus quis dolor. Nulla accumsan, elit
                    sit amet varius semper, nulla mauris mollis quam, tempor suscipit diam nulla vel
                    leo.
                  </p>

                  <Button
                    className="mx-auto mt-6 block"
                    variant={'action'}
                    disabled={isJoined || isOwner}
                    size={'lg'}
                    onClick={() => joinEvent(eventId)}
                  >
                    {isOwner && 'You created this event'}
                    {isJoined && 'Joined'}
                    {!isJoined && !isOwner && 'Join'}
                  </Button>
                </div>
              </CardContent>

              <CardFooter className="px-6 py-0">
                <EventCardFooter
                  maxCapacity={data.event.maxCapacity}
                  participantsCount={data.event.participantsCount}
                  date={data.event.date}
                />
              </CardFooter>
            </Card>
          </>
        )}
      </article>
    </>
  )
}

export default EventDetailPage
