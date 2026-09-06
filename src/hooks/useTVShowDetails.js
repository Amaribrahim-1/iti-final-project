import { useQuery } from '@tanstack/react-query'
import getTVShowDetails from '../api/getTVShowDetails'

function useTVShowDetails(id) {
  return useQuery({
    queryKey: ['tvShowDetails', id],
    queryFn: () => getTVShowDetails(id),
  })
}

export default useTVShowDetails
