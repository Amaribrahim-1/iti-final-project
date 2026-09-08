import { useSearchParams } from 'react-router'
import useSearchMovies from '../../hooks/useSearchMovies'
import MovieCard from '../../components/MovieCard'
import Loader from '../../components/Loader'
import ErrorState from '../../components/ErrorState'

function SearchResultsPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query') || ''
  const { data, isPending, isError, error } = useSearchMovies(query, 1)

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {query && (
        <h1 className="mb-6 font-semibold text-dark">
          Search Results for : {query}
        </h1>
      )}

      {!query && (
        <p className="text-muted">
          Type something into the search bar to find movies.
        </p>
      )}

      {query && isPending && <Loader />}

      {query && isError && <ErrorState message={error.message} />}

      {query && !isPending && !isError && (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {data.results.map((item) => (
            <MovieCard key={item.id} item={item} mediaType="movie" />
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchResultsPage
