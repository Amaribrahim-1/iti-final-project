import { useParams } from 'react-router'
import useTVShowDetails from '../../hooks/useTVShowDetails'
import useTVShowRecommendations from '../../hooks/useTVShowRecommendations'
import useTVShowReviews from '../../hooks/useTVShowReviews'
import MovieCard from '../../components/MovieCard'
import Loader from '../../components/Loader'
import ErrorState from '../../components/ErrorState'
import buildImageUrl from '../../utils/buildImageUrl'
import formatDate from '../../utils/formatDate'

function TVShowDetailsPage() {
  const { id } = useParams()
  const { data, isPending, isError, error } = useTVShowDetails(id)
  const {
    data: recommendationsData,
    isPending: isRecommendationsPending,
    isError: isRecommendationsError,
    error: recommendationsError,
  } = useTVShowRecommendations(id)
  const {
    data: reviewsData,
    isPending: isReviewsPending,
    isError: isReviewsError,
    error: reviewsError,
  } = useTVShowReviews(id)
  const posterUrl = buildImageUrl(data?.poster_path)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Core Info Section */}
      <section>
        {isPending && <Loader />}
        {isError && (
          <ErrorState
            message={error?.message || 'Failed to load TV show details.'}
          />
        )}
        {data && (
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="w-full shrink-0 overflow-hidden rounded-lg bg-gray-200 md:w-72">
              {posterUrl ? (
                <img
                  src={posterUrl}
                  alt={data.name}
                  className="aspect-[2/3] w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[2/3] w-full items-center justify-center text-sm text-muted">
                  No image
                </div>
              )}
            </div>

            <div className="flex flex-1 flex-col gap-4">
              <h1 className="text-3xl font-bold text-dark">{data.name}</h1>
              {data.first_air_date && (
                <p className="text-sm text-muted">
                  First aired {formatDate(data.first_air_date)}
                </p>
              )}
              <p className="text-sm text-dark">
                {data.number_of_seasons} seasons · {data.number_of_episodes}{' '}
                episodes
              </p>
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
      </section>

      {/* Recommendations Section */}
      <section className="mt-12 border-t border-gray-200 pt-8">
        <h2 className="mb-6 text-2xl font-bold text-dark">Recommendations</h2>
        {isRecommendationsPending && <Loader />}
        {isRecommendationsError && (
          <ErrorState
            message={
              recommendationsError?.message ||
              'Failed to load recommendations.'
            }
          />
        )}
        {recommendationsData?.results &&
          recommendationsData.results.length > 0 && (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {recommendationsData.results.map((item) => (
                <MovieCard key={item.id} item={item} mediaType="tv" />
              ))}
            </div>
          )}
        {recommendationsData?.results &&
          recommendationsData.results.length === 0 && (
            <p className="text-muted">No recommendations available.</p>
          )}
      </section>

      {/* Reviews Section */}
      <section className="mt-12 border-t border-gray-200 pt-8">
        <h2 className="mb-6 text-2xl font-bold text-dark">Reviews</h2>
        {isReviewsPending && <Loader />}
        {isReviewsError && (
          <ErrorState
            message={reviewsError?.message || 'Failed to load reviews.'}
          />
        )}
        {reviewsData?.results && reviewsData.results.length > 0 && (
          <ul className="space-y-6">
            {reviewsData.results.map((review) => (
              <li
                key={review.id}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-xs"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-semibold text-dark">{review.author}</h3>
                  {review.created_at && (
                    <span className="text-xs text-muted">
                      {formatDate(review.created_at)}
                    </span>
                  )}
                </div>
                <p className="line-clamp-4 whitespace-pre-line text-sm leading-relaxed text-dark">
                  {review.content}
                </p>
              </li>
            ))}
          </ul>
        )}
        {reviewsData?.results && reviewsData.results.length === 0 && (
          <p className="text-muted">No reviews yet</p>
        )}
      </section>
    </div>
  )
}

export default TVShowDetailsPage
