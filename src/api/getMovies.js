import tmdbClient from './tmdbClient'

async function getMovies(page) {
  const response = await tmdbClient.get('/movie/popular', {
    params: { page },
  })

  return response.data
}

export default getMovies
