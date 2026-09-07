import { useQuery } from '@tanstack/react-query'
import getTVShows from '../api/getTVShows'

function useTVShows(page = 1) {
  return useQuery({
    queryKey: ['tvShows', page],
    queryFn: () => getTVShows(page),
  })
}

export default useTVShows
