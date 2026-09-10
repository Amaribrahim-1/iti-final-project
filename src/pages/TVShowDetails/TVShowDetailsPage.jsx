import { useParams } from 'react-router'
import useTVShowDetails from '../../hooks/useTVShowDetails'
import Loader from '../../components/Loader'
import ErrorState from '../../components/ErrorState'
import buildImageUrl from '../../utils/buildImageUrl'
import formatDate from '../../utils/formatDate'

function TVShowDetailsPage() {
  const { id } = useParams()
  const { data, isPending, isError, error } = useTVShowDetails(id)
  const posterUrl = buildImageUrl(data?.poster_path)

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {isPending && <Loader />}
      {isError && (
        <ErrorState
          message={error?.message || 'Failed to load TV show details.'}
        />
      )}
      {data && (
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="w-full shrink-0 overflow-hidden rounded-lg bg-gray-200 md:w-72">
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={data.name}
                className="aspect-[2/3] w-full object-cover"
              />
            ) : (
              <div className="flex aspect-[2/3] w-full items-center justify-center text-sm text-muted">
                No image
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-4">
            <h1 className="text-3xl font-bold text-dark">{data.name}</h1>
            {data.first_air_date && (
              <p className="text-sm text-muted">
                First aired {formatDate(data.first_air_date)}
              </p>
            )}
            <p className="text-sm text-dark">
              {data.number_of_seasons} seasons · {data.number_of_episodes}{' '}
              episodes
            </p>
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
          </div>
        </div>
      )}
    </section>
  )
}

export default TVShowDetailsPage
