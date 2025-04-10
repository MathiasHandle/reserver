import { useLogoutUser, useUser } from '@/hooks'
import useGetEventCategories from '@/hooks/api/useGetEventCategories'
import { useRouter } from '@tanstack/react-router'
import { EventForm } from '../Events/components'
import { UserDetail } from './components'

// TODO make this route protected
function ProfilePage() {
  const { data: userData } = useUser()

  const router = useRouter()

  const { mutate: logoutUser } = useLogoutUser(() => {
    router.navigate({ to: '/' })
  })

  const { data: eventCategories } = useGetEventCategories()

  return (
    <>
      <h1 className="mt-8 mb-4 text-center text-2xl font-bold">Profile</h1>

      <div className="mx-auto my-6 w-1/2">
        {eventCategories && <EventForm eventCategories={eventCategories.categories} />}
      </div>

      <aside className="m-auto w-fit">
        {userData && <UserDetail userData={userData} onLogout={logoutUser} />}
      </aside>

      <section></section>
    </>
  )
}

export default ProfilePage
