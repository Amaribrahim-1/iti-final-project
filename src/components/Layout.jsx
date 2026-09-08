import { Outlet } from 'react-router'
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
    </div>
  )
}

export default Layout
