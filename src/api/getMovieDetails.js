import tmdbClient from './tmdbClient'

async function getMovieDetails(id) {
  const response = await tmdbClient.get(`/movie/${id}`)

  return response.data
}

export default getMovieDetails
