import { useQuery } from '@tanstack/react-query'
import getMovieDetails from '../api/getMovieDetails'

function useMovieDetails(id) {
  return useQuery({
    queryKey: ['movieDetails', id],
    queryFn: () => getMovieDetails(id),
  })
}

export default useMovieDetails
