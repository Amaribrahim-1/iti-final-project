import { useParams } from 'react-router'
import useTVShowDetails from '../../hooks/useTVShowDetails'
import useTVShowRecommendations from '../../hooks/useTVShowRecommendations'
import useTVShowReviews from '../../hooks/useTVShowReviews'
import ReviewsList from '../../components/ReviewsList'
import TVShowDetailsInfo from './components/TVShowDetailsInfo'
import TVShowRecommendations from './components/TVShowRecommendations'

function TVShowDetailsPage() {
  const { id } = useParams()
  const { data, isPending, isError, error } = useTVShowDetails(id)
  const {
    data: recommendations,
    isPending: isRecommendationsPending,
    isError: isRecommendationsError,
    error: recommendationsError,
  } = useTVShowRecommendations(id)

  const {
    data: reviews,
    isPending: isReviewsPending,
    isError: isReviewsError,
    error: reviewsError,
  } = useTVShowReviews(id)

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <TVShowDetailsInfo
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
      <TVShowRecommendations
        key={`recommendations-${id}`}
        data={recommendations}
        isPending={isRecommendationsPending}
        isError={isRecommendationsError}
        error={recommendationsError}
      />
    </section>
  )
}

export default TVShowDetailsPage
