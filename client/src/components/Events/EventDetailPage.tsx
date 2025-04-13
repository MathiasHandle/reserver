import {
  useDeleteEvent,
  useGetEventDetail,
  useGetJoinedEvents,
  useJoinEvent,
  useUser,
  useUserCreatedEvents,
} from '@/hooks'
import { useStore } from '@/store'
import { Link, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { EventCardFooter, EventDetailGhost, EventFormModal } from './components'

type EventDetailPageProps = {
  eventId: number
}

function EventDetailPage({ eventId }: EventDetailPageProps) {
  const { data: event, isFetching: isFetchingEvent } = useGetEventDetail(eventId)
  const { mutate: joinEvent } = useJoinEvent()
  const { data: user } = useUser()
  const { data: joinedEvents } = useGetJoinedEvents(!!user)
  const { data: createdEvents } = useUserCreatedEvents(!!user)
  const setModal = useStore(state => state.setModal)

  const isJoined = joinedEvents?.some(event => event.id === eventId)
  const isOwner = createdEvents?.some(event => event.id === eventId)

  const [isFormModalOpen, setIsFormModalOpen] = useState(false)

  const { mutate: deleteEvent } = useDeleteEvent()

  const router = useRouter()

  function onDeleteEventClick() {
    deleteEvent(eventId, {
      onSuccess: () => {
        router.navigate({ to: '/events', search: { categoryId: -1, sort: 'desc' } })
      },
    })
  }

  function onJoinEventClick() {
    if (!user) {
      setModal('login', { isOpen: true })
      return
    }

    joinEvent(eventId)
  }

  return (
    <>
      <Link
        to="/events"
        search={{ categoryId: -1, sort: 'desc' }}
        className="mx-auto mt-4 block w-fit sm:mx-0"
      >
        <Button variant={'destructive'}>Back to events</Button>
      </Link>

      {isFetchingEvent && !event && <EventDetailGhost />}

      <article className="m-4 w-fit sm:my-8 lg:mx-auto">
        {event && (
          <>
            <Card className="max-w-[800px]">
              <CardHeader>
                <h1 className="mb-2 text-center text-2xl font-bold">{event.name}</h1>

                {isOwner && (
                  <div className="flex w-full justify-center gap-4 sm:justify-end">
                    <Button variant="destructive" onClick={onDeleteEventClick}>
                      Delete
                    </Button>
                    <Button variant="action" onClick={() => setIsFormModalOpen(true)}>
                      Edit
                    </Button>
                  </div>
                )}
              </CardHeader>

              <CardContent className="flex flex-col gap-8 lg:flex-row">
                <div className="flex h-64 w-full items-center justify-center rounded-xl bg-amber-400 text-xl font-bold lg:grow lg:basis-1/2">
                  image placeholder
                </div>

                <div className="lg:grow lg:basis-1/2">
                  <p>
                    {event.description} Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    Pellentesque ipsum. Etiam posuere lacus quis dolor. Nulla accumsan, elit sit
                    amet varius semper, nulla mauris mollis quam, tempor suscipit diam nulla vel
                    leo.
                  </p>

                  <Button
                    className="mx-auto mt-6 block"
                    variant={'action'}
                    disabled={isJoined || isOwner}
                    size={'lg'}
                    onClick={onJoinEventClick}
                  >
                    {isOwner && 'You created this event'}
                    {isJoined && 'Joined'}
                    {!isJoined && !isOwner && 'Join'}
                  </Button>
                </div>
              </CardContent>

              <CardFooter className="px-6 py-0">
                <EventCardFooter
                  maxCapacity={event.maxCapacity}
                  participantsCount={event.participantsCount}
                  date={event.date}
                />
              </CardFooter>
            </Card>
          </>
        )}
      </article>

      <EventFormModal
        isOpen={isFormModalOpen}
        setIsOpen={setIsFormModalOpen}
        defaultValues={event}
      />
    </>
  )
}

export default EventDetailPage
