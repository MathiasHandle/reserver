import { MainBanner, TopCategories, TopEvents } from './components'

function Homepage() {
  return (
    <>
      <main className="container">
        <MainBanner />

        <section className="container m-auto my-8">
          <h2 className="mb-4 text-center text-2xl font-bold sm:mb-6">Top Categories</h2>
          <TopCategories />
        </section>

        <section className="container m-auto my-8">
          <h2 className="mb-4 text-center text-2xl font-bold sm:mb-6">Top Events</h2>
          <TopEvents />
        </section>
      </main>
    </>
  )
}

export default Homepage
