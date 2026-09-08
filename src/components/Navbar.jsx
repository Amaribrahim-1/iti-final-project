import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { Heart, Menu, Search, X } from 'lucide-react'
import useWishlistStore from '../store/useWishlistStore'

const NAV_LINKS = [
  { label: 'Movies', to: '/' },
  { label: 'TV Shows', to: '/?tab=tv' },
  { label: 'Trending', to: '/trending' },
  { label: 'AI Movie Assistant', to: '/ai-assistant' },
]

function Navbar() {
  const [query, setQuery] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()
  const wishlist = useWishlistStore((state) => state.wishlist)

  function handleSearchSubmit(event) {
    event.preventDefault()
    navigate(`/search?query=${encodeURIComponent(query)}`)
    setIsMenuOpen(false)
  }

  return (
    <div className="bg-primary px-4 py-3 sm:px-8">
      <div className="flex items-center justify-between gap-4">
        <Link to="/" className="shrink-0 text-xl font-bold text-dark">
          Movie App
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-dark hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <form
          onSubmit={handleSearchSubmit}
          className="flex flex-1 items-stretch overflow-hidden rounded-full sm:max-w-xs"
        >
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search and explore...."
            className="w-full min-w-0 bg-background px-4 py-2 text-dark focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Search"
            className="flex items-center justify-center bg-dark px-4 text-background"
          >
            <Search size={18} />
          </button>
        </form>

        <Link
          to="/wishlist"
          className="hidden shrink-0 items-center gap-2 text-dark md:flex"
        >
          <Heart size={20} fill="currentColor" />
          <span>watchlist</span>
          <span className="rounded bg-background px-2 py-0.5 text-sm font-semibold">
            {wishlist.length}
          </span>
        </Link>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="text-dark md:hidden"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <nav className="mt-3 flex flex-col gap-3 border-t border-dark/10 pt-3 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setIsMenuOpen(false)}
              className="text-dark"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/wishlist"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-2 text-dark"
          >
            <Heart size={20} fill="currentColor" />
            <span>watchlist</span>
            <span className="rounded bg-background px-2 py-0.5 text-sm font-semibold">
              {wishlist.length}
            </span>
          </Link>
        </nav>
      )}
    </div>
  )
}

export default Navbar
