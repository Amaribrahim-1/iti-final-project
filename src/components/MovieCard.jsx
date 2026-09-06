import { Link } from 'react-router'
import { Heart } from 'lucide-react'
import useWishlistStore from '../store/useWishlistStore'
import buildImageUrl from '../utils/buildImageUrl'
import formatDate from '../utils/formatDate'

const RATING_RADIUS = 16
const RATING_CIRCUMFERENCE = 2 * Math.PI * RATING_RADIUS

function getRatingRingClass(percent) {
  if (percent >= 70) {
    return 'stroke-rating-high'
  }

  if (percent >= 40) {
    return 'stroke-rating-mid'
  }

  return 'stroke-rating-low'
}

function MovieCard({ item, mediaType }) {
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist)
  const isInWishlist = useWishlistStore((state) =>
    state.isInWishlist(item.id, mediaType),
  )

  const title = item.title || item.name
  const posterUrl = buildImageUrl(item.poster_path)
  const ratingPercent = Math.round((item.vote_average || 0) * 10)
  const dashOffset =
    RATING_CIRCUMFERENCE - (ratingPercent / 100) * RATING_CIRCUMFERENCE
  const detailsPath =
    mediaType === 'tv' ? `/tv/${item.id}` : `/movie/${item.id}`
  const formattedDate = formatDate(item.release_date || item.first_air_date)

  function handleHeartClick() {
    toggleWishlist(item, mediaType)
  }

  return (
    <article className="flex flex-col">
      <Link to={detailsPath} className="group block">
        <div className="relative">
          <div className="overflow-hidden rounded-lg bg-gray-200">
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={title}
                className="aspect-[2/3] w-full object-cover transition duration-200 group-hover:brightness-75"
              />
            ) : (
              <div className="flex aspect-[2/3] w-full items-center justify-center text-sm text-gray-500">
                No image
              </div>
            )}
          </div>
          <div className="absolute -bottom-5 left-2 flex h-10 w-10 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-rating-track" />
            <svg
              className="absolute inset-0 -rotate-90"
              viewBox="0 0 40 40"
              aria-hidden="true"
            >
              <circle
                cx="20"
                cy="20"
                r={RATING_RADIUS}
                fill="none"
                className="stroke-gray-700"
                strokeWidth="3"
              />
              <circle
                cx="20"
                cy="20"
                r={RATING_RADIUS}
                fill="none"
                className={getRatingRingClass(ratingPercent)}
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={RATING_CIRCUMFERENCE}
                strokeDashoffset={dashOffset}
              />
            </svg>
            <span className="relative text-[10px] font-semibold text-white">
              {ratingPercent}
              <span className="text-[8px]">%</span>
            </span>
          </div>
        </div>
        <h3 className="mt-7 line-clamp-2 leading-tight font-semibold text-dark group-hover:text-primary">
          {title}
        </h3>
      </Link>
      <div className="mt-0 flex items-start justify-between gap-2">
        <p className="text-sm text-muted">{formattedDate}</p>
        <button
          type="button"
          onClick={handleHeartClick}
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={isInWishlist}
          className="cursor-pointer rounded p-1"
        >
          <Heart
            className={
              isInWishlist ? 'h-5 w-5 text-primary' : 'h-5 w-5 text-dark'
            }
            fill={isInWishlist ? 'currentColor' : 'none'}
          />
        </button>
      </div>
    </article>
  )
}

export default MovieCard
