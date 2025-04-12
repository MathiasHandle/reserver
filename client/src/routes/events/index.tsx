import { EventsPage } from '@/components/Events'
import { createFileRoute } from '@tanstack/react-router'

export type EventsPageSearchParams = {
  categoryId?: number
  sort: 'asc' | 'desc'
}

export const Route = createFileRoute('/events/')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): EventsPageSearchParams => {
    let categoryId: EventsPageSearchParams['categoryId']

    // remove query params if they are not valid
    if (!search.categoryId || isNaN(Number(search.categoryId))) {
      categoryId = undefined
    } else {
      categoryId = Number(search.categoryId)
    }

    // set default sort if not provided, or if it's not valid
    let sort: EventsPageSearchParams['sort']
    if (!search.sort || (search.sort !== 'asc' && search.sort !== 'desc')) {
      sort = 'desc'
    } else {
      sort = search.sort as EventsPageSearchParams['sort']
    }

    return {
      categoryId,
      sort,
    }
  },
})

function RouteComponent() {
  const searchParams = Route.useSearch()

  return (
    <>
      <EventsPage searchParams={searchParams} />
    </>
  )
}
