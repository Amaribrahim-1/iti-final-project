import { useEffect } from 'react'
import { Outlet, ScrollRestoration } from 'react-router'
import Navbar from './Navbar'
import useThemeStore from '../store/useThemeStore'

function Layout() {
  const theme = useThemeStore((state) => state.theme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <div className="min-h-screen bg-background text-dark">
      <header>
        <nav>
          <Navbar />
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <ScrollRestoration />
    </div>
  )
}

export default Layout
