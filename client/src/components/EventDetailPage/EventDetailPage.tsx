import { useGetEventDetail } from '@/hooks'
import { Button } from '../ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import EventDetailGhost from './EventDetailGhost'

type EventDetailPageProps = {
  eventId: number
}

function EventDetailPage({ eventId }: EventDetailPageProps) {
  const { data, isFetching } = useGetEventDetail(eventId)

  function handleJoinClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    console.log('join clicked')
  }

  return (
    <>
      {isFetching && !data && <EventDetailGhost />}

      <article className="m-4 w-fit sm:my-8 lg:mx-auto">
        {data && (
          <>
            <Card className="max-w-[800px]">
              <CardHeader>
                <h1 className="text-center text-2xl font-bold">{data.event.name}</h1>
              </CardHeader>

              <CardContent className="flex flex-col gap-8 lg:flex-row">
                <div className="flex h-64 w-full items-center justify-center rounded-xl bg-amber-400 text-xl font-bold lg:grow lg:basis-1/2">
                  image placeholder
                </div>

                <div className="lg:grow lg:basis-1/2">
                  <p>
                    {data.event.description} Lorem ipsum dolor sit amet, consectetuer adipiscing
                    elit. Pellentesque ipsum. Etiam posuere lacus quis dolor. Nulla accumsan, elit
                    sit amet varius semper, nulla mauris mollis quam, tempor suscipit diam nulla vel
                    leo.
                  </p>

                  <Button
                    className="mx-auto mt-6 block"
                    variant={'action'}
                    size={'lg'}
                    onClick={handleJoinClick}
                  >
                    Join
                  </Button>
                </div>
              </CardContent>

              <CardFooter className="mt-8 flex flex-col justify-between p-0 px-6 sm:flex-row">
                <span>Capacity: {data.event.maxCapacity}</span>
                <time className="italic">{data.event.date}</time>
              </CardFooter>
            </Card>
          </>
        )}
      </article>
    </>
  )
}

export default EventDetailPage
