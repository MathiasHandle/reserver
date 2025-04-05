import { api } from '@/api'
import { useLogoutUser } from '@/hooks'
import { MainBanner } from './components'

function Homepage() {
  async function onCheckUser() {
    try {
      const res = await api.users.getUser()
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  const { mutate: logoutUser } = useLogoutUser()

  function onLogout() {
    logoutUser()
  }

  return (
    <>
      <MainBanner />

      <div className="container mx-auto flex gap-6">
        <button onClick={onCheckUser}>Check user</button>
        <button onClick={onLogout}>Logout</button>
      </div>
    </>
  )
}

export default Homepage
