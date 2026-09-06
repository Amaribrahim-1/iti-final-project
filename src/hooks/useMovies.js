import { useQuery } from '@tanstack/react-query'
import getMovies from '../api/getMovies'

function useMovies(page = 1) {
  return useQuery({
    queryKey: ['movies', page],
    queryFn: () => getMovies(page),
  })
}

export default useMovies
