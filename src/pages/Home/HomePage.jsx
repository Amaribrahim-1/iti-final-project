import { useSearchParams } from 'react-router'
import useMovies from '../../hooks/useMovies'
import useTVShows from '../../hooks/useTVShows'
import Loader from '../../components/Loader'
import ErrorState from '../../components/ErrorState'
import Pagination from '../../components/Pagination'
import HomeTabs from './components/HomeTabs'
import ResultsGrid from './components/ResultsGrid'

function parseTab(value) {
  return value === 'tv' ? 'tv' : 'movies'
}

function parsePage(value) {
  const page = Number.parseInt(value, 10)
  return Number.isFinite(page) && page > 0 ? page : 1
}

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = parseTab(searchParams.get('tab'))
  const page = parsePage(searchParams.get('page'))
  const isTvTab = activeTab === 'tv'
  const moviesQuery = useMovies(page)
  const tvShowsQuery = useTVShows(page)
  const { data, isPending, isError, isSuccess, error } = isTvTab
    ? tvShowsQuery
    : moviesQuery
  const mediaType = isTvTab ? 'tv' : 'movie'

  function updateSearchParams(nextTab, nextPage) {
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous)

      if (nextTab === 'movies') {
        next.delete('tab')
      } else {
        next.set('tab', nextTab)
      }

      if (nextPage <= 1) {
        next.delete('page')
      } else {
        next.set('page', String(nextPage))
      }

      return next
    })
  }

  function handleTabChange(tabId) {
    updateSearchParams(tabId, 1)
  }

  function handlePageChange(nextPage) {
    updateSearchParams(activeTab, nextPage)
  }

  const sectionHeading = isTvTab ? 'Popular TV Shows' : 'Popular Movies'
  const totalPages = Math.min(data?.total_pages ?? 1, 500)

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <HomeTabs activeTab={activeTab} onTabChange={handleTabChange} />
      <h2 className="mb-6 text-2xl font-bold text-dark">{sectionHeading}</h2>

      <div role="tabpanel">
        {isPending && <Loader />}
        {isError && <ErrorState message={error.message} />}
        {isSuccess && (
          <ResultsGrid results={data.results} mediaType={mediaType} />
        )}
      </div>

      {isSuccess && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  )
}

export default HomePage
