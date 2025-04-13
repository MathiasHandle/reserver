import { useGetJoinedEvents, useUser, useUserCreatedEvents } from '@/hooks'
import useGetEventCategories from '@/hooks/api/events/useGetEventCategories'
import { EventForm, EventList, EventListGhost } from '../Events'
import { UserDetail } from './components'

// TODO make this route protected
function ProfilePage() {
  const { data: user } = useUser()

  const { data: eventCategories } = useGetEventCategories()

  const { data: createdEvents, isFetching: isFetchingCreatedEvents } = useUserCreatedEvents(!!user)
  const { data: joinedEvents, isFetching: isFetchingJoinedEvents } = useGetJoinedEvents(!!user)

  return (
    <>
      <h1 className="mt-8 mb-4 text-center text-2xl font-bold">Profile</h1>

      <div className="my-8 flex flex-col gap-6">
        <section className="m-auto flex w-fit flex-col items-start gap-6 sm:w-full sm:flex-row sm:justify-center">
          {user && <UserDetail userData={user} />}

          {eventCategories && (
            <div className="w-full sm:w-1/2">
              <EventForm eventCategories={eventCategories} />
            </div>
          )}
        </section>

        <section>
          <h2 className="mb-4 text-center text-2xl font-bold">Events you've created</h2>
          {isFetchingCreatedEvents && !createdEvents && <EventListGhost numberOfEvents={3} />}

          {!isFetchingCreatedEvents && !createdEvents?.length && (
            <div className="text-center">You didn't create any events :/ ... Try it!</div>
          )}

          {createdEvents && <EventList events={createdEvents} />}
        </section>

        <section>
          <h2 className="mb-4 text-center text-2xl font-bold">Events you've joined</h2>
          {isFetchingJoinedEvents && !joinedEvents && <EventListGhost numberOfEvents={3} />}

          {!isFetchingJoinedEvents && !joinedEvents?.length && (
            <div className="text-center">You didn't join any events :/ ... Try it!</div>
          )}

          {joinedEvents?.length && <EventList events={joinedEvents} />}
        </section>
      </div>
    </>
  )
}

export default ProfilePage
