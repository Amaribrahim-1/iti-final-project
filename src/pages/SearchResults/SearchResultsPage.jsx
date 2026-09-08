import { useSearchParams } from 'react-router'
import { SearchX } from 'lucide-react'
import useSearchMovies from '../../hooks/useSearchMovies'
import MovieCard from '../../components/MovieCard'
import Loader from '../../components/Loader'
import ErrorState from '../../components/ErrorState'
import Pagination from '../../components/Pagination'

function parsePage(value) {
  const page = Number.parseInt(value, 10)
  return Number.isFinite(page) && page > 0 ? page : 1
}

function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('query') || ''
  const page = parsePage(searchParams.get('page'))
  const { data, isPending, isError, error } = useSearchMovies(query, page)

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

  const totalPages = Math.min(data?.total_pages ?? 1, 500)
  const hasResults =
    Boolean(query) && !isPending && !isError && data.results.length > 0

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {query && (
        <h1 className="mb-6 text-lg font-semibold text-dark sm:text-xl">
          Search Results for : {query}
        </h1>
      )}

      {!query && (
        <p className="py-16 text-center text-muted">
          Type something into the search bar to find movies.
        </p>
      )}

      {query && isPending && <Loader />}

      {query && isError && <ErrorState message={error.message} />}

      {query && !isPending && !isError && data.results.length === 0 && (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <SearchX size={64} className="text-muted" strokeWidth={1.5} />
          <p className="text-muted">No results found for '{query}'</p>
        </div>
      )}

      {hasResults && (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-6">
          {data.results.map((item) => (
            <MovieCard key={item.id} item={item} mediaType="movie" />
          ))}
        </div>
      )}

      {hasResults && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}

export default SearchResultsPage
