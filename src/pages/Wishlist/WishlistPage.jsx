import { Link } from 'react-router'
import MovieCard from '../../components/MovieCard'
import useWishlistStore from '../../store/useWishlistStore'

function WishlistPage() {
  const wishlist = useWishlistStore((state) => state.wishlist)

  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist,
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-2xl font-bold text-dark sm:text-3xl">
        Watch list
      </h1>

      {wishlist.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
            <span className="text-4xl text-gray-400">♡</span>
          </div>

          <p className="mb-6 text-lg text-muted">No Movies in watch list</p>

          <Link
            to="/"
            className="rounded-md bg-primary px-10 py-3 text-sm font-medium text-dark transition hover:opacity-80"
          >
            Back to home
          </Link>
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {wishlist.map((item) => (
            <li
              key={`${item.media_type}-${item.id}`}
              className="flex h-full flex-col"
            >
              <MovieCard item={item} mediaType={item.media_type} />

              <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-dark">
                  {item.media_type === 'movie' ? 'Movie' : 'TV Show'}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    removeFromWishlist(item.id, item.media_type)
                  }
                  className="rounded-md border border-gray-300 px-3 py-1 text-xs font-medium text-dark transition hover:bg-gray-100"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default WishlistPage
