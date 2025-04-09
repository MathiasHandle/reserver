import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

function EventDetailGhost() {
  return (
    <div className="m-4 flex sm:mx-0 sm:my-8">
      <Card className="w-full max-w-[800px] lg:mx-auto">
        <CardHeader>
          <Skeleton className="mx-auto h-8 w-1/2" />
        </CardHeader>

        <CardContent className="flex flex-col gap-6 lg:flex-row">
          <Skeleton className="h-64 w-full lg:basis-1/2" />

          <div className="lg:grow">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton className="mt-2 h-6" key={i} />
            ))}

            <Skeleton className="mx-auto mt-6 h-8 w-20" />
          </div>
        </CardContent>

        <CardFooter>
          <div className="flex w-full justify-between">
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-4 w-16" />
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default EventDetailGhost
