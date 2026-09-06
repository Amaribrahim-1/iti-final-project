import { useQuery } from '@tanstack/react-query'
import getMovieRecommendations from '../api/getMovieRecommendations'

function useMovieRecommendations(movieId) {
  return useQuery({
    queryKey: ['movieRecommendations', movieId],
    queryFn: () => getMovieRecommendations(movieId),
  })
}

export default useMovieRecommendations
