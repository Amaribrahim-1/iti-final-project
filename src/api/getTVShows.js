import tmdbClient from './tmdbClient'

async function getTVShows(page) {
  const response = await tmdbClient.get('/tv/popular', {
    params: { page },
  })

  return response.data
}

export default getTVShows
