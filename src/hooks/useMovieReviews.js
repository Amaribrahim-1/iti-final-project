import { useQuery } from '@tanstack/react-query'
import getMovieReviews from '../api/getMovieReviews'

function useMovieReviews(movieId) {
  return useQuery({
    queryKey: ['movieReviews', movieId],
    queryFn: () => getMovieReviews(movieId),
  })
}

export default useMovieReviews
