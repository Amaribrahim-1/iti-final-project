import tmdbClient from './tmdbClient'

async function getTVShowRecommendations(tvId) {
  const response = await tmdbClient.get(`/tv/${tvId}/recommendations`)

  return response.data
}

export default getTVShowRecommendations
