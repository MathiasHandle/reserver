import { Event } from '@/api/events/eventTypes'
import { Dialog, DialogContent, DialogPortal, DialogTitle } from '@/components/ui/dialog'
import useGetEventCategories from '@/hooks/api/events/useGetEventCategories'
import EventForm from '../EventForm'

type EventFormModalProps = {
  isOpen: boolean
  onChange: (isOpen: boolean) => void
  defaultValues?: Event
}

function EventFormModal(props: EventFormModalProps) {
  const { data: eventCategories } = useGetEventCategories()

  return (
    <Dialog open={props.isOpen} onOpenChange={props.onChange}>
      <DialogPortal>
        <DialogTitle className="sr-only">Edit event form</DialogTitle>

        <DialogContent className="rounded-xl p-0">
          {eventCategories && (
            <EventForm eventCategories={eventCategories} defaultValues={props.defaultValues} />
          )}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export default EventFormModal
