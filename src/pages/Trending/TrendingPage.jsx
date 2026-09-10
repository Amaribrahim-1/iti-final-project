import { useSearchParams } from 'react-router'
import useTrending from '../../hooks/useTrending'
import Loader from '../../components/Loader'
import ErrorState from '../../components/ErrorState'
import MovieCard from '../../components/MovieCard'
import Pagination from '../../components/Pagination'

function parsePage(value) {
  const page = Number.parseInt(value, 10)
  return Number.isFinite(page) && page > 0 ? page : 1
}

function TrendingPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = parsePage(searchParams.get('page'))
  const { data, isPending, isError, isSuccess, error } = useTrending(page)
  const results = (data?.results ?? []).filter(
    (item) => item.media_type === 'movie' || item.media_type === 'tv',
  )
  const totalPages = Math.min(data?.total_pages ?? 1, 500)

  function handlePageChange(nextPage) {
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous)

      if (nextPage <= 1) {
        next.delete('page')
      } else {
        next.set('page', String(nextPage))
      }

      return next
    })
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-dark">Trending</h1>

      {isPending && <Loader />}
      {isError && (
        <ErrorState
          message={error?.message || 'Failed to load trending content.'}
        />
      )}
      {isSuccess && (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {results.map((item) => (
            <MovieCard
              key={`${item.media_type}-${item.id}`}
              item={item}
              mediaType={item.media_type}
            />
          ))}
        </div>
      )}
      {isSuccess && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  )
}

export default TrendingPage
