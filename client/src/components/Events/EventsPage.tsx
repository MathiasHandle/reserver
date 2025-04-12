import CoverPhotoAVIF from '@/assets/events-list-cover.avif'
import CoverPhotoJPG from '@/assets/events-list-cover.jpg'
import CoverPhotoWEBP from '@/assets/events-list-cover.webp'
import { useGetEvents } from '@/hooks'
import { EventsPageSearchParams } from '@/routes/events'
import { useState } from 'react'

import EventFilters from './components/EventFilters'
import EventList from './EventList'
import EventListGhost from './EventListGhost'

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

        {isFetchingEvents && !events && <EventListGhost numberOfEvents={12} />}

        {events && <EventList events={events.events} />}
      </section>
    </article>
  )
}

export default EventsPage
