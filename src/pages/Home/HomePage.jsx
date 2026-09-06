import Loader from '../../components/Loader'
import ErrorState from '../../components/ErrorState'

function HomePage() {
  return (
    <div className="space-y-8 p-8">
      <h1>Home Page</h1>
      <section>
        <h2 className="mb-4 text-sm text-gray-500">Loader</h2>
        <Loader />
      </section>
      <section>
        <h2 className="mb-4 text-sm text-gray-500">ErrorState</h2>
        <ErrorState message="Something went wrong. Please try again." />
      </section>
    </div>
  )
}

export default HomePage
