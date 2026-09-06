import { useQuery } from '@tanstack/react-query'
import searchMovies from '../api/searchMovies'

function useSearchMovies(query, page = 1) {
  return useQuery({
    queryKey: ['searchMovies', query, page],
    queryFn: () => searchMovies(query, page),
    enabled: Boolean(query),
  })
}

export default useSearchMovies
