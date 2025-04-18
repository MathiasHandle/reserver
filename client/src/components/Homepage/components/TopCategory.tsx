import { EventCategoryWithEventCount } from '@/api/events/eventTypes'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from '@tanstack/react-router'

type TopCategoryProps = {
  category: EventCategoryWithEventCount
}

function TopCategory(props: TopCategoryProps) {
  return (
    <Link to="/events" search={{ categoryId: props.category.id, sort: 'desc' }}>
      <Card>
        <CardContent>
          <div className="flex items-center gap-2 text-center">
            <h4 className="w-full font-bold capitalize">{props.category.name}</h4>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default TopCategory
