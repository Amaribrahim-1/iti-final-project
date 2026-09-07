import { Link } from 'react-router'
import { Heart, Search } from 'lucide-react'

function Navbar() {
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

      <form className="flex items-center">
        <input
          type="text"
          placeholder="Search and explore...."
          className="rounded-l bg-background px-3 py-2 text-dark focus:outline-none"
        />
        <button
          type="submit"
          className="flex items-center rounded-r bg-dark px-3 py-2 text-background"
        >
          <Search size={18} />
        </button>
      </form>

      <Link to="/wishlist" className="flex items-center gap-2 text-dark">
        <Heart size={20} />
        <span>0</span>
      </Link>
    </div>
  )
}

export default Navbar
