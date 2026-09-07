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

function parseTab(value) {
  return value === 'tv' ? 'tv' : 'movies'
}

function parsePage(value) {
  const n = parseInt(value, 10)
  return Number.isFinite(n) && n > 0 ? n : 1
}

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tabFromUrl = parseTab(searchParams.get('tab'))
  const page = parsePage(searchParams.get('page'))
  const [activeTab, setActiveTab] = useState(tabFromUrl)

  if (activeTab !== tabFromUrl) {
    setActiveTab(tabFromUrl)
  }

  const moviesQuery = useMovies(page)
  const tvShowsQuery = useTVShows(page)
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
      next.delete('page') // reset to page 1 on tab switch
      return next
    })
  }

  function handlePageChange(delta) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      const newPage = parsePage(prev.get('page')) + delta
      if (newPage <= 1) {
        next.delete('page')
      } else {
        next.set('page', String(newPage))
      }
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

      <div className="mt-10 flex items-center justify-center gap-4">
        <button
          type="button"
          id="pagination-prev"
          onClick={() => handlePageChange(-1)}
          disabled={page <= 1}
          className="rounded-md bg-surface px-5 py-2 text-sm font-medium text-dark transition-colors hover:bg-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          ← Previous
        </button>

        <span className="text-sm text-muted" aria-live="polite">
          Page {page}
        </span>

        <button
          type="button"
          id="pagination-next"
          onClick={() => handlePageChange(1)}
          className="rounded-md bg-surface px-5 py-2 text-sm font-medium text-dark transition-colors hover:bg-primary"
        >
          Next →
        </button>
      </div>
    </section>
  )
}

export default HomePage
