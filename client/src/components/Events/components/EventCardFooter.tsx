import { formatDate } from '@/utils'

type EventCardFooterProps = {
  participantsCount: number
  maxCapacity: number
  date: string
}

function EventCardFooter({ participantsCount, maxCapacity, date }: EventCardFooterProps) {
  return (
    <div className="flex w-full flex-col justify-between sm:flex-row">
      <div>
        Capacity: {maxCapacity - participantsCount}/{maxCapacity}
      </div>
      <time dateTime={date} className="italic">
        {formatDate(date)}
      </time>
    </div>
  )
}

export default EventCardFooter
