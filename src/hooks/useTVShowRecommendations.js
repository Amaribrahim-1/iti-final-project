import { useQuery } from '@tanstack/react-query'
import getTVShowRecommendations from '../api/getTVShowRecommendations'

function useTVShowRecommendations(tvId) {
  return useQuery({
    queryKey: ['tvShowRecommendations', tvId],
    queryFn: () => getTVShowRecommendations(tvId),
  })
}

export default useTVShowRecommendations
