import { Outlet, ScrollRestoration } from 'react-router'
import Navbar from './Navbar'

function Layout() {
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
