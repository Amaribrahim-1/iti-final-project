import { useParams } from 'react-router'
import useMovieDetails from '../../hooks/useMovieDetails'
import useMovieRecommendations from '../../hooks/useMovieRecommendations'
import useMovieReviews from '../../hooks/useMovieReviews'
import ReviewsList from '../../components/ReviewsList'
import MovieDetailsInfo from './components/MovieDetailsInfo'
import MovieRecommendations from './components/MovieRecommendations'

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

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <MovieDetailsInfo
        data={data}
        isPending={isPending}
        isError={isError}
        error={error}
      />
      <ReviewsList
        key={`reviews-${id}`}
        reviews={reviews?.results}
        isPending={isReviewsPending}
        isError={isReviewsError}
        error={reviewsError}
      />
      <MovieRecommendations
        key={`recommendations-${id}`}
        data={recommendations}
        isPending={isRecommendationsPending}
        isError={isRecommendationsError}
        error={recommendationsError}
      />
    </section>
  )
}

export default MovieDetailsPage
