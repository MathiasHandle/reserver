import { api } from '@/api'
import { MainBanner } from './components'
import TopCategories from './components/TopCategories'

function Homepage() {
  async function onCheckUser() {
    try {
      const res = await api.users.getUser()
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <main className="container">
        <MainBanner />

        <TopCategories />

        <div className="mx-auto flex gap-6">
          <button onClick={onCheckUser}>Check user</button>
        </div>
      </main>
    </>
  )
}

export default Homepage
