import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import Layout from './components/Layout'
import HomePage from './pages/Home/HomePage'
import MovieDetailsPage from './pages/MovieDetails/MovieDetailsPage'
import TVShowDetailsPage from './pages/TVShowDetails/TVShowDetailsPage'
import SearchResultsPage from './pages/SearchResults/SearchResultsPage'
import WishlistPage from './pages/Wishlist/WishlistPage'
import TrendingPage from './pages/Trending/TrendingPage'
import AIAssistantPage from './pages/AIAssistant/AIAssistantPage'

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: 'movie/:id', Component: MovieDetailsPage },
      { path: 'tv/:id', Component: TVShowDetailsPage },
      { path: 'search', Component: SearchResultsPage },
      { path: 'wishlist', Component: WishlistPage },
      { path: 'trending', Component: TrendingPage },
      { path: 'ai-assistant', Component: AIAssistantPage },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
