import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import PokemonDetail from './pages/PokemonDetails.jsx'
import FavoritesPage from './pages/Favorites.jsx'
import { FavoritesProvider } from './contexts/FavortiesContext.jsx'
import ComparisonTool from './components/CompareTool.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/pokemon/:name",
    element: <PokemonDetail />
  }, {
    path: "/favorites",
    element: <FavoritesPage />

  },
  {
    path: "/compare",
    element: <ComparisonTool />

  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FavoritesProvider>
      <ErrorBoundary>
        <RouterProvider router={appRouter} />
      </ErrorBoundary>
    </FavoritesProvider>
  </StrictMode>,
)
