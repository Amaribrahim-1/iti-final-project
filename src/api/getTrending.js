import tmdbClient from './tmdbClient'

async function getTrending(page) {
  const response = await tmdbClient.get('/trending/all/day', {
    params: { page },
  })

  return response.data
}

export default getTrending
