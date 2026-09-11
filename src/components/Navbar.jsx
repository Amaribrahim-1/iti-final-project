import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { Heart, Menu, Moon, Search, Sun, X } from 'lucide-react'
import useWishlistStore from '../store/useWishlistStore'
import useThemeStore from '../store/useThemeStore'

const NAV_LINKS = [
  { label: 'Movies', to: '/' },
  { label: 'TV Shows', to: '/?tab=tv' },
  { label: 'Trending', to: '/trending' },
  { label: 'AI Movie Assistant', to: '/ai-assistant' },
]

const navLinkClass =
  'text-dark underline-offset-4 transition-colors hover:underline dark:hover:text-primary'

function Navbar() {
  const [query, setQuery] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()
  const wishlist = useWishlistStore((state) => state.wishlist)
  const theme = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)

  function handleSearchSubmit(event) {
    event.preventDefault()
    const trimmedQuery = query.trim()
    if (!trimmedQuery) {
      return
    }
    navigate(`/search?query=${encodeURIComponent(trimmedQuery)}`)
    setIsMenuOpen(false)
  }

  const isDark = theme === 'dark'

  return (
    <div
      className={`px-4 py-3 sm:px-8 ${
        isDark
          ? 'border-b border-white/10 bg-background'
          : 'bg-primary'
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <Link
          to="/"
          className="shrink-0 text-xl font-bold text-dark dark:text-primary"
        >
          Movie App
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.label} to={link.to} className={navLinkClass}>
              {link.label}
            </Link>
          ))}
        </nav>

        <form
          onSubmit={handleSearchSubmit}
          className="flex flex-1 items-stretch overflow-hidden rounded-full bg-background dark:bg-surface dark:ring-1 dark:ring-white/15 sm:max-w-xs"
        >
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search..."
            className="w-full min-w-0 bg-transparent px-3 py-2 text-dark focus:outline-none sm:px-4"
          />
          <button
            type="submit"
            aria-label="Search"
            className="flex items-center justify-center bg-dark px-4 text-background dark:bg-primary"
          >
            <Search size={18} />
          </button>
        </form>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={
            theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
          }
          className="shrink-0 cursor-pointer text-dark"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <Link
          to="/wishlist"
          className={`hidden shrink-0 items-center gap-2 md:flex ${navLinkClass}`}
        >
          <Heart size={20} fill="currentColor" />
          <span>watchlist</span>
          <span className="rounded bg-background px-2 py-0.5 text-sm font-semibold text-dark">
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
              className={navLinkClass}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/wishlist"
            onClick={() => setIsMenuOpen(false)}
            className={`flex items-center gap-2 ${navLinkClass}`}
          >
            <Heart size={20} fill="currentColor" />
            <span>watchlist</span>
            <span className="rounded bg-background px-2 py-0.5 text-sm font-semibold text-dark">
              {wishlist.length}
            </span>
          </Link>
        </nav>
      )}
    </div>
  )
}

export default Navbar
