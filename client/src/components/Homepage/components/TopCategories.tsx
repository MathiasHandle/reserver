import useGetEventCategories from '@/hooks/api/useGetEventCategories'
import TopCategory from './TopCategory'

function TopCategories() {
  const limit = 6

  const { data, isLoading } = useGetEventCategories({
    limit,
    sort: 'desc',
  })

  return (
    <div className="container m-auto my-8">
      {/* TODO ghost loading */}
      {isLoading && <div>Loading...</div>}

      {data?.categories && (
        <div className="grid grid-cols-2 gap-2 px-4 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-4 sm:px-0 md:gap-x-8">
          {data.categories.map(category => (
            <TopCategory category={category} key={category.id} />
          ))}
        </div>
      )}
    </div>
  )
}

export default TopCategories
