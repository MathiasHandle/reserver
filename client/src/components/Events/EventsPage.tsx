import CoverPhotoAVIF from '@/assets/events-list-cover.avif'
import CoverPhotoJPG from '@/assets/events-list-cover.jpg'
import CoverPhotoWEBP from '@/assets/events-list-cover.webp'
import { useGetEvents } from '@/hooks'
import { Skeleton } from '../ui/skeleton'
import { EventList } from './components'

function EventsPage() {
  const { data, isFetching } = useGetEvents()

  return (
    <article>
      <section>
        <picture>
          <source src={CoverPhotoAVIF} type="image/avif" />
          <source src={CoverPhotoWEBP} type="image/webp" />
          <img src={CoverPhotoJPG} alt="Cover Photo" />
        </picture>
      </section>

      <section className="my-8 px-4 text-center">
        <h1 className="mb-6 text-4xl font-bold">Events</h1>

        {isFetching && !data && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 12 }).map((_, index) => (
              <Skeleton className="h-40" key={index} />
            ))}
          </div>
        )}

        {data && <EventList events={data.events} />}
      </section>
    </article>
  )
}

export default EventsPage
