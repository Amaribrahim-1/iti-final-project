import { Heart } from 'lucide-react'
import useWishlistStore from '../../../store/useWishlistStore'
import Loader from '../../../components/Loader'
import ErrorState from '../../../components/ErrorState'
import buildImageUrl from '../../../utils/buildImageUrl'
import formatDate from '../../../utils/formatDate'

function MovieDetailsInfo({ data, isPending, isError, error }) {
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist)
  const isInWishlist = useWishlistStore((state) =>
    state.isInWishlist(data?.id, 'movie'),
  )
  const posterUrl = buildImageUrl(data?.poster_path)
  const spokenLanguages = (data?.spoken_languages ?? [])
    .map((language) => language.english_name)
    .filter(Boolean)
    .join(', ')
  const productionCompany = data?.production_companies?.find(
    (company) => company.logo_path,
  )

  function handleHeartClick() {
    toggleWishlist(data, 'movie')
  }

  return (
    <>
      {isPending && <Loader />}
      {isError && (
        <ErrorState
          message={error?.message || 'Failed to load movie details.'}
        />
      )}
      {data && (
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="w-full shrink-0 overflow-hidden rounded-lg bg-gray-200 md:w-72">
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={data.title}
                className="aspect-[2/3] w-full object-cover"
              />
            ) : (
              <div className="flex aspect-[2/3] w-full items-center justify-center text-sm text-muted">
                No image
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold text-dark">{data.title}</h1>
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-dark">
                  Movie
                </span>
              </div>
              <button
                type="button"
                onClick={handleHeartClick}
                aria-label={
                  isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'
                }
                aria-pressed={isInWishlist}
                className="cursor-pointer rounded p-1"
              >
                <Heart
                  className={
                    isInWishlist ? 'h-7 w-7 text-primary' : 'h-7 w-7 text-dark'
                  }
                  fill={isInWishlist ? 'currentColor' : 'none'}
                />
              </button>
            </div>
            {data.release_date && (
              <p className="text-sm text-muted">
                {formatDate(data.release_date)}
              </p>
            )}
            <p className="text-sm font-semibold text-dark">
              Rating:{' '}
              <span className="font-normal">
                {Number(data.vote_average || 0).toFixed(1)} / 10
              </span>
            </p>
            {data.genres?.length > 0 && (
              <ul className="flex flex-wrap gap-2">
                {data.genres.map((genre) => (
                  <li
                    key={genre.id}
                    className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-dark"
                  >
                    {genre.name}
                  </li>
                ))}
              </ul>
            )}
            <p className="leading-relaxed text-dark">{data.overview}</p>
            {(data.runtime || spokenLanguages) && (
              <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-dark">
                {data.runtime ? (
                  <p>
                    <span className="font-semibold">Duration: </span>
                    {data.runtime} Min.
                  </p>
                ) : null}
                {spokenLanguages ? (
                  <p>
                    <span className="font-semibold">Languages: </span>
                    {spokenLanguages}
                  </p>
                ) : null}
              </div>
            )}
            {productionCompany && (
              <img
                src={buildImageUrl(productionCompany.logo_path)}
                alt={productionCompany.name}
                className="h-10 w-auto max-w-[140px] self-start object-contain"
              />
            )}
            {data.homepage && (
              <a
                href={data.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit rounded-full border border-gray-300 px-4 py-2 text-sm text-dark"
              >
                Website
              </a>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default MovieDetailsInfo
