import tmdbClient from './tmdbClient'

async function getTrending() {
  const response = await tmdbClient.get('/trending/all/day')

  return response.data
}

export default getTrending
