import { MainBanner } from './components'
import TopCategories from './components/TopCategories'

function Homepage() {
  return (
    <>
      <main className="container">
        <MainBanner />

        <TopCategories />
      </main>
    </>
  )
}

export default Homepage
