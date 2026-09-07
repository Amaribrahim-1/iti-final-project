import { useState } from 'react'
import { useSearchParams } from 'react-router'
import useMovies from '../../hooks/useMovies'
import useTVShows from '../../hooks/useTVShows'
import Loader from '../../components/Loader'
import ErrorState from '../../components/ErrorState'
import MovieCard from '../../components/MovieCard'

const TABS = [
  { id: 'movies', label: 'Movies' },
  { id: 'tv', label: 'TV Shows' },
]

const PAGE = 1

function parseTab(value) {
  return value === 'tv' ? 'tv' : 'movies'
}

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tabFromUrl = parseTab(searchParams.get('tab'))
  const [activeTab, setActiveTab] = useState(tabFromUrl)

  if (activeTab !== tabFromUrl) {
    setActiveTab(tabFromUrl)
  }

  const moviesQuery = useMovies(PAGE)
  const tvShowsQuery = useTVShows(PAGE)
  const isTvTab = activeTab === 'tv'
  const { data, isPending, isError, error } = isTvTab
    ? tvShowsQuery
    : moviesQuery
  const mediaType = isTvTab ? 'tv' : 'movie'

  function handleTabClick(tabId) {
    setActiveTab(tabId)
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.set('tab', tabId)
      return next
    })
  }

  let content

  if (isPending) {
    content = <Loader />
  } else if (isError) {
    content = <ErrorState message={error.message} />
  } else {
    content = (
      <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {data.results.map((item) => (
          <li key={item.id}>
            <MovieCard item={item} mediaType={mediaType} />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex gap-2" role="tablist" aria-label="Media type">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => handleTabClick(tab.id)}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary text-dark'
                  : 'bg-surface text-muted hover:text-dark'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <div role="tabpanel">{content}</div>
    </section>
  )
}

export default HomePage
