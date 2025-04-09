import { EventDetailPage } from '@/components/Events'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/events/$event')({
  component: RouteComponent,
})

function RouteComponent() {
  const { event: eventId } = Route.useParams()

  return (
    <>
      <EventDetailPage eventId={Number(eventId)} />
    </>
  )
}
