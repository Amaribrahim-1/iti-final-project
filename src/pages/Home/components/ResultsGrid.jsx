import MovieCard from '../../../components/MovieCard'

function ResultsGrid({ results, mediaType }) {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {results.map((item) => (
        <li key={item.id}>
          <MovieCard item={item} mediaType={mediaType} />
        </li>
      ))}
    </ul>
  )
}

export default ResultsGrid
