import useTrending from '../../hooks/useTrending'
import Loader from '../../components/Loader'
import ErrorState from '../../components/ErrorState'
import MovieCard from '../../components/MovieCard'

function TrendingPage() {
  const { data, isPending, isError, error } = useTrending()

  if (isPending) {
    return <Loader />
  }

  if (isError) {
    return (
      <ErrorState
        message={error?.message || 'Failed to load trending content.'}
      />
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-dark">Trending</h1>

      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {data.results.map((item) => (
          <MovieCard
            key={`${item.media_type}-${item.id}`}
            item={item}
            mediaType={item.media_type}
          />
        ))}
      </div>
    </main>
  )
}

export default TrendingPage