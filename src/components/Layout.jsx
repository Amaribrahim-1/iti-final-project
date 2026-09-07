import { Outlet } from 'react-router'

function Layout() {
  return (
    <div className="min-h-screen bg-background text-dark">
      <header>
        <nav>{/* Navbar slot — Sahar fills this in later */}</nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
