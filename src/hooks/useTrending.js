import { useQuery } from '@tanstack/react-query'
import getTrending from '../api/getTrending'

function useTrending(page = 1) {
  return useQuery({
    queryKey: ['trending', page],
    queryFn: () => getTrending(page),
  })
}

export default useTrending
