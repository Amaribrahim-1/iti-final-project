import tmdbClient from './tmdbClient'

async function getMovieReviews(movieId) {
  const response = await tmdbClient.get(`/movie/${movieId}/reviews`)

  return response.data
}

export default getMovieReviews
