import CartBadge from './components/CartBadge.jsx'
import CartPage from './pages/CartPage.jsx'
import FilterSidebar from './components/FilterSidebar.jsx'
import ProductGrid from './components/ProductGrid.jsx'
import ToastNotification from './components/ToastNotification.jsx'
import './app.css'

export default function App() {
  return (
    <main className="app-shell">
      <ToastNotification />
      <header className="app-header">
        <a className="brand-lockup" href="#top" aria-label="Nova Market home"><span className="brand-orbit" aria-hidden="true">N</span><span className="brand-mark">NOVA / MARKET</span></a>
        <div className="header-cart"><CartBadge /></div>
      </header>
      <section className="hero" id="top">
        <div className="hero-copy"><span className="eyebrow">Objects for everyday wonder</span><h1>Find your next <em>favorite.</em></h1><p>A considered collection of clever tech, beautiful sound, and little upgrades that make daily life feel lighter.</p><a className="hero-link" href="#products-heading">Explore the collection <span aria-hidden="true">↘</span></a></div>
        <div className="hero-orb hero-orb-large" aria-hidden="true"><span>new<br />arrivals</span></div><div className="hero-orb hero-orb-small" aria-hidden="true">✦</div><div className="hero-note"><span>01</span><span>Quietly<br />exceptional</span></div>
      </section>

      <div className="store-layout">
        <FilterSidebar />
        <ProductGrid />
      </div>

      <CartPage />
    </main>
  )
}
