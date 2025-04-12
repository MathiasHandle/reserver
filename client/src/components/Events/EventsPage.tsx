import CoverPhotoAVIF from '@/assets/events-list-cover.avif'
import CoverPhotoJPG from '@/assets/events-list-cover.jpg'
import CoverPhotoWEBP from '@/assets/events-list-cover.webp'
import { useGetEvents } from '@/hooks'
import { EventsPageSearchParams } from '@/routes/events'
import { useState } from 'react'
import { Skeleton } from '../ui/skeleton'
import { EventList } from './components'
import EventFilters from './components/EventFilters'

type EventsPageProps = {
  searchParams: EventsPageSearchParams
}

function EventsPage(props: EventsPageProps) {
  const [filters, setFilters] = useState({
    categoryId: props.searchParams.categoryId ?? -1,
    sort: props.searchParams.sort,
  })

  const { data: events, isFetching: isFetchingEvents } = useGetEvents({
    categoryId: filters.categoryId === -1 ? undefined : filters.categoryId,
    sort: filters.sort,
  })

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

        <div className="mx-auto mb-8 w-fit">
          <EventFilters searchParams={props.searchParams} updateFilters={setFilters} />
        </div>

        {isFetchingEvents && !events && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 12 }).map((_, index) => (
              <Skeleton className="h-40" key={index} />
            ))}
          </div>
        )}

        {events && <EventList events={events.events} />}
      </section>
    </article>
  )
}

export default EventsPage
