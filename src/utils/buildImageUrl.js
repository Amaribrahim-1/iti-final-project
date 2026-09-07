const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

function buildImageUrl(posterPath) {
  if (!posterPath) {
    return ''
  }

  return `${IMAGE_BASE_URL}${posterPath}`
}

export default buildImageUrl
