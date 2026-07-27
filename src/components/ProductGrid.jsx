import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../features/cart/cartSlice.js'
import { products } from '../data/products.js'

const formatPrice = (price) => `₹${price.toLocaleString('en-IN')}`

export default function ProductGrid() {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.cartItems)
  const filters = useSelector((state) => state.filters)

  const filteredProducts = useMemo(() => {
    const searchTerm = filters.search.trim().toLowerCase()
    const matchingProducts = products.filter((product) => {
      const matchesCategory = filters.category === 'All' || product.category === filters.category
      const matchesPrice = product.price >= filters.minPrice && product.price <= filters.maxPrice
      const matchesSearch = !searchTerm || product.name.toLowerCase().includes(searchTerm)

      return matchesCategory && matchesPrice && matchesSearch
    })

    return matchingProducts.sort((first, second) => {
      if (filters.sortBy === 'priceLowToHigh') return first.price - second.price
      if (filters.sortBy === 'priceHighToLow') return second.price - first.price
      if (filters.sortBy === 'rating') return second.rating - first.rating
      return new Date(second.createdAt) - new Date(first.createdAt)
    })
  }, [filters])

  return (
    <section className="product-section" aria-labelledby="products-heading">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Curated for you</span>
          <h2 id="products-heading">Products</h2>
        </div>
        <span className="result-count">{filteredProducts.length} results</span>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="empty-results">
          <h3>No products found</h3>
          <p>Try widening your price range or changing your search.</p>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => {
            const cartItem = cartItems.find((item) => item.id === product.id)

            return (
              <article className="product-card" key={product.id}>
                <div className="product-art" aria-hidden="true">{product.category.charAt(0)}</div>
                <div className="product-card-content">
                  <span className="product-category">{product.category}</span>
                  <h3>{product.name}</h3>
                  <div className="product-meta">
                    <strong>{formatPrice(product.price)}</strong>
                    <span>★ {product.rating}</span>
                  </div>
                  <button className="primary-button" type="button" onClick={() => dispatch(addToCart(product))}>
                    {cartItem ? `Add another (${cartItem.quantity})` : 'Add to cart'}
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}

