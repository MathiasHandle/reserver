import { EventDetailPage } from '@/components/Events'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/events/$eventId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { eventId: eventId } = Route.useParams()

  return (
    <>
      <EventDetailPage eventId={Number(eventId)} />
    </>
  )
}
