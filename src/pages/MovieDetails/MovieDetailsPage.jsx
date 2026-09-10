import { useParams } from 'react-router'
import useMovieDetails from '../../hooks/useMovieDetails'
import useMovieRecommendations from '../../hooks/useMovieRecommendations'
import useMovieReviews from '../../hooks/useMovieReviews'
import Loader from '../../components/Loader'
import ErrorState from '../../components/ErrorState'
import MovieCard from '../../components/MovieCard'
import buildImageUrl from '../../utils/buildImageUrl'
import formatDate from '../../utils/formatDate'

function MovieDetailsPage() {
  const { id } = useParams()
  const { data, isPending, isError, error } = useMovieDetails(id)
  const {
    data: recommendations,
    isPending: isRecommendationsPending,
    isError: isRecommendationsError,
    error: recommendationsError,
  } = useMovieRecommendations(id)
  const {
    data: reviews,
    isPending: isReviewsPending,
    isError: isReviewsError,
    error: reviewsError,
  } = useMovieReviews(id)
  const posterUrl = buildImageUrl(data?.poster_path)

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {isPending && <Loader />}
      {isError && (
        <ErrorState
          message={error?.message || 'Failed to load movie details.'}
        />
      )}
      {data && (
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="w-full shrink-0 overflow-hidden rounded-lg bg-gray-200 md:w-72">
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={data.title}
                className="aspect-[2/3] w-full object-cover"
              />
            ) : (
              <div className="flex aspect-[2/3] w-full items-center justify-center text-sm text-muted">
                No image
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-4">
            <h1 className="text-3xl font-bold text-dark">{data.title}</h1>
            {data.release_date && (
              <p className="text-sm text-muted">
                {formatDate(data.release_date)}
              </p>
            )}
            <p className="text-sm font-semibold text-dark">
              Rating:{' '}
              <span className="font-normal">
                {Number(data.vote_average || 0).toFixed(1)} / 10
              </span>
            </p>
            {data.genres?.length > 0 && (
              <ul className="flex flex-wrap gap-2">
                {data.genres.map((genre) => (
                  <li
                    key={genre.id}
                    className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-dark"
                  >
                    {genre.name}
                  </li>
                ))}
              </ul>
            )}
            <p className="leading-relaxed text-dark">{data.overview}</p>
          </div>
        </div>
      )}

      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-bold text-dark">Recommendations</h2>
        {isRecommendationsPending && <Loader />}
        {isRecommendationsError && (
          <ErrorState
            message={
              recommendationsError?.message ||
              'Failed to load recommended movies.'
            }
          />
        )}
        {recommendations?.results && (
          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {recommendations.results.map((item) => (
              <li key={item.id}>
                <MovieCard item={item} mediaType="movie" />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-bold text-dark">Reviews</h2>
        {isReviewsPending && <Loader />}
        {isReviewsError && (
          <ErrorState
            message={reviewsError?.message || 'Failed to load movie reviews.'}
          />
        )}
        {reviews?.results?.length === 0 && (
          <p className="text-muted">No reviews yet</p>
        )}
        {reviews?.results?.length > 0 && (
          <ul className="flex flex-col gap-6">
            {reviews.results.map((review) => (
              <li
                key={review.id}
                className="rounded-lg bg-surface px-4 py-4"
              >
                <h3 className="mb-2 font-semibold text-dark">{review.author}</h3>
                <p className="line-clamp-6 leading-relaxed text-dark">
                  {review.content}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  )
}

export default MovieDetailsPage
