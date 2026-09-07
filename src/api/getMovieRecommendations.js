import tmdbClient from './tmdbClient'

async function getMovieRecommendations(movieId) {
  const response = await tmdbClient.get(`/movie/${movieId}/recommendations`)

  return response.data
}

export default getMovieRecommendations
