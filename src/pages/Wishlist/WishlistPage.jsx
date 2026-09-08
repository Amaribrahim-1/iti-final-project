import { useNavigate } from 'react-router'
import MovieCard from '../../components/MovieCard'
import useWishlistStore from '../../store/useWishlistStore'

function WishlistPage() {
  const wishlist = useWishlistStore((state) => state.wishlist)

  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist,
  )

  const navigate = useNavigate()

  return (
    <main>
      <h1>Watch List</h1>

      {wishlist.length === 0 ? (
        <div>
          <p>No Movies in watch list</p>

          <button
            type="button"
            onClick={() => navigate('/')}
          >
            Back to home
          </button>
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {wishlist.map((item) => (
            <li key={`${item.media_type}-${item.id}`}>
              <MovieCard
                item={item}
                mediaType={item.media_type}
              />

              <span>
                {item.media_type === 'movie' ? 'Movie' : 'TV Show'}
              </span>

              <button
                type="button"
                onClick={() =>
                  removeFromWishlist(item.id, item.media_type)
                }
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default WishlistPage