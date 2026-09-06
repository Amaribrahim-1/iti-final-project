import { useQuery } from '@tanstack/react-query'
import getTVShowReviews from '../api/getTVShowReviews'

function useTVShowReviews(tvId) {
  return useQuery({
    queryKey: ['tvShowReviews', tvId],
    queryFn: () => getTVShowReviews(tvId),
  })
}

export default useTVShowReviews
