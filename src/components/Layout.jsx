import { Outlet } from 'react-router'

function Layout() {
  return (
    <div>
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
