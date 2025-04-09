import { EventsPage } from '@/components/Events'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/events/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <EventsPage />
    </>
  )
}
