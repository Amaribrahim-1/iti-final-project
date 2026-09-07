import tmdbClient from './tmdbClient'

async function getTVShowDetails(id) {
  const response = await tmdbClient.get(`/tv/${id}`)

  return response.data
}

export default getTVShowDetails
