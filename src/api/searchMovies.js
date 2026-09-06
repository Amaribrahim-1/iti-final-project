import tmdbClient from './tmdbClient'

async function searchMovies(query, page) {
  const response = await tmdbClient.get('/search/movie', {
    params: { query, page },
  })

  return response.data
}

export default searchMovies
