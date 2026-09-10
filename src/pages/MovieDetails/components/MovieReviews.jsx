import { useState } from 'react'
import Loader from '../../../components/Loader'
import ErrorState from '../../../components/ErrorState'

function MovieReviews({ data, isPending, isError, error }) {
  const [showAllReviews, setShowAllReviews] = useState(false)
  const allReviews = data?.results ?? []
  const visibleReviews = showAllReviews ? allReviews : allReviews.slice(0, 3)

  return (
    <section className="mt-12">
      <h2 className="mb-6 text-2xl font-bold text-dark">Reviews</h2>
      {isPending && <Loader />}
      {isError && (
        <ErrorState
          message={error?.message || 'Failed to load movie reviews.'}
        />
      )}
      {allReviews.length === 0 && data && (
        <p className="text-muted">No reviews yet</p>
      )}
      {visibleReviews.length > 0 && (
        <ul className="flex flex-col gap-6">
          {visibleReviews.map((review) => (
            <li key={review.id} className="rounded-lg bg-surface px-4 py-4">
              <h3 className="mb-2 font-semibold text-dark">{review.author}</h3>
              <p className="line-clamp-6 leading-relaxed text-dark">
                {review.content}
              </p>
            </li>
          ))}
        </ul>
      )}
      {allReviews.length > 3 && (
        <button
          type="button"
          onClick={() => setShowAllReviews(!showAllReviews)}
          aria-expanded={showAllReviews}
          className="mt-6 cursor-pointer rounded-md bg-primary px-5 py-2 text-sm font-semibold text-dark hover:opacity-80"
        >
          {showAllReviews ? 'Show less' : 'Show more'}
        </button>
      )}
    </section>
  )
}

export default MovieReviews
