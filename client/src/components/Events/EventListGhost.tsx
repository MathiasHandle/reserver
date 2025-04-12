import { Skeleton } from '@/components/ui/skeleton'

type EventListGhostProps = {
  numberOfEvents: number
}

function EventListGhost(props: EventListGhostProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: props.numberOfEvents }).map((_, index) => (
        <Skeleton className="h-40" key={index} />
      ))}
    </div>
  )
}

export default EventListGhost
