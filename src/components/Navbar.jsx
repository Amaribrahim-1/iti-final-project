import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { Heart, Search } from 'lucide-react'
import useWishlistStore from '../store/useWishlistStore'

function Navbar() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const wishlist = useWishlistStore((state) => state.wishlist)

  function handleSearchSubmit(event) {
    event.preventDefault()
    navigate(`/search?query=${encodeURIComponent(query)}`)
  }

  return (
    <div className="flex items-center justify-between gap-4 bg-primary px-6 py-4">
      <Link to="/" className="text-xl font-bold text-dark">
        Movie App
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/" className="text-dark hover:underline">
          Movies
        </Link>
        <Link to="/" className="text-dark hover:underline">
          TV Shows
        </Link>
        <Link to="/trending" className="text-dark hover:underline">
          Trending
        </Link>
        <Link to="/ai-assistant" className="text-dark hover:underline">
          AI Movie Assistant
        </Link>
      </div>
      <form
        onSubmit={handleSearchSubmit}
        className="flex items-stretch overflow-hidden rounded"
      >
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search and explore...."
          className="bg-background px-3 py-2 text-dark focus:outline-none"
        />
        <button
          type="submit"
          className="flex items-center justify-center bg-dark px-3 text-background"
        >
          <Search size={18} />
        </button>
      </form>

      <Link to="/wishlist" className="flex items-center gap-2 text-dark">
        <Heart size={20} />
        <span>{wishlist.length}</span>
      </Link>
    </div>
  )
}

export default Navbar
