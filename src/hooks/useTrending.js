import { useQuery } from '@tanstack/react-query'
import getTrending from '../api/getTrending'

function useTrending() {
  return useQuery({
    queryKey: ['trending'],
    queryFn: () => getTrending(),
  })
}

export default useTrending
