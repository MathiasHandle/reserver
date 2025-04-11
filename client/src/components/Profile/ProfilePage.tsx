import { useGetJoinedEvents, useLogoutUser, useUser, useUserCreatedEvents } from '@/hooks'
import useGetEventCategories from '@/hooks/api/events/useGetEventCategories'
import { useRouter } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { EventForm, EventList } from '../Events/components'
import { UserDetail } from './components'

// TODO make this route protected
function ProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const { data: userData } = useUser()

  useEffect(() => {
    if (userData?.id) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [userData])

  const router = useRouter()

  const { mutate: logoutUser } = useLogoutUser(() => {
    router.navigate({ to: '/' })
  })

  const { data: eventCategories } = useGetEventCategories()

  const { data: createdEvents } = useUserCreatedEvents()
  const { data: joinedEvents } = useGetJoinedEvents(isLoggedIn)

  return (
    <>
      <h1 className="mt-8 mb-4 text-center text-2xl font-bold">Profile</h1>

      <div className="mx-auto my-6 w-1/2">
        {eventCategories && <EventForm eventCategories={eventCategories} />}
      </div>

      <aside className="m-auto w-fit">
        {userData && <UserDetail userData={userData} onLogout={logoutUser} />}
      </aside>

      <section>
        <h2 className="font-lg mt-6 text-center font-bold">Your events</h2>
        {createdEvents && !createdEvents.length && (
          <div className="text-center">You didn't create any events :/ ... Try it!</div>
        )}

        {createdEvents && <EventList events={createdEvents} />}
      </section>

      <section>
        <h2 className="font-lg mt-6 text-center font-bold">Events you joined</h2>
        {joinedEvents && !joinedEvents.length && (
          <div className="text-center">You didn't join any events :/ ... Try it!</div>
        )}

        {joinedEvents && <EventList events={joinedEvents} />}
      </section>
    </>
  )
}

export default ProfilePage
