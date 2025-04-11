import { Skeleton } from '@/components/ui/skeleton'
import useGetEventCategories from '@/hooks/api/events/useGetEventCategories'
import TopCategory from './TopCategory'

function TopCategories() {
  const limit = 6

  const { data: categories, isFetching } = useGetEventCategories({
    limit,
    sort: 'desc',
  })

  return (
    <div className="container m-auto my-8">
      {isFetching && (
        <div className="grid grid-cols-2 gap-2 px-4 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-4 sm:px-0 md:gap-x-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-20" />
          ))}
        </div>
      )}

      {categories && (
        <div className="grid grid-cols-2 gap-2 px-4 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-4 sm:px-0 md:gap-x-8">
          {categories.map(category => (
            <TopCategory category={category} key={category.id} />
          ))}
        </div>
      )}
    </div>
  )
}

export default TopCategories
