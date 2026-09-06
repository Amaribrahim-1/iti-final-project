import tmdbClient from './tmdbClient'

async function getTVShowReviews(tvId) {
  const response = await tmdbClient.get(`/tv/${tvId}/reviews`)

  return response.data
}

export default getTVShowReviews
