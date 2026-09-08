import { useSearchParams } from 'react-router'
import { SearchX } from 'lucide-react'
import useSearchMovies from '../../hooks/useSearchMovies'
import MovieCard from '../../components/MovieCard'
import Loader from '../../components/Loader'
import ErrorState from '../../components/ErrorState'

function SearchResultsPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query') || ''
  const { data, isPending, isError, error } = useSearchMovies(query, 1)

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

      {query && !isPending && !isError && data.results.length > 0 && (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-6">
          {data.results.map((item) => (
            <MovieCard key={item.id} item={item} mediaType="movie" />
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchResultsPage
