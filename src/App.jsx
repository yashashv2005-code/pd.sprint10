import CartBadge from './components/CartBadge.jsx'
import CartPage from './pages/CartPage.jsx'
import FilterSidebar from './components/FilterSidebar.jsx'
import ProductGrid from './components/ProductGrid.jsx'
import './app.css'

export default function App() {
  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <span className="brand-mark">NOVA / MARKET</span>
          <h1>Find your next favorite.</h1>
        </div>
        <CartBadge />
      </header>

      <div className="store-layout">
        <FilterSidebar />
        <ProductGrid />
      </div>

      <CartPage />
    </main>
  )
}

