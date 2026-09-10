import { useState } from 'react'
import Loader from '../../../components/Loader'
import ErrorState from '../../../components/ErrorState'
import MovieCard from '../../../components/MovieCard'

function TVShowRecommendations({ data, isPending, isError, error }) {
  const [showAllRecommendations, setShowAllRecommendations] = useState(false)
  const allRecommendedShows = data?.results ?? []
  const recommendedShows = showAllRecommendations
    ? allRecommendedShows
    : allRecommendedShows.slice(0, 6)

  return (
    <section className="mt-12">
      <h2 className="mb-6 text-2xl font-bold text-dark">Recommendations</h2>
      {isPending && <Loader />}
      {isError && (
        <ErrorState
          message={error?.message || 'Failed to load recommended TV shows.'}
        />
      )}
      {allRecommendedShows.length === 0 && data && (
        <p className="text-muted">No recommendations yet</p>
      )}
      {recommendedShows.length > 0 && (
        <ul className="grid grid-cols-3 gap-x-4 gap-y-8 md:grid-cols-6">
          {recommendedShows.map((item) => (
            <li key={item.id}>
              <MovieCard item={item} mediaType="tv" />
            </li>
          ))}
        </ul>
      )}
      {allRecommendedShows.length > 6 && (
        <button
          type="button"
          onClick={() => setShowAllRecommendations(!showAllRecommendations)}
          aria-expanded={showAllRecommendations}
          className="mt-6 cursor-pointer rounded-md bg-primary px-5 py-2 text-sm font-semibold text-dark hover:opacity-80"
        >
          {showAllRecommendations ? 'Show less' : 'Show more'}
        </button>
      )}
    </section>
  )
}

export default TVShowRecommendations
