import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../features/cart/cartSlice.js'
import { products } from '../data/products.js'
import { showToast } from '../features/ui/uiSlice.js'
import ErrorState from './ErrorState.jsx'
import LoadingSpinner from './LoadingSpinner.jsx'

const formatPrice = (price) => `₹${price.toLocaleString('en-IN')}`

const ProductCard = memo(function ProductCard({ product, cartItem, onAddToCart }) {
  return (
    <article className="product-card">
      <div className={`product-art art-${product.category.toLowerCase()}`} aria-hidden="true"><span>{product.category.charAt(0)}</span><i>nova</i></div>
      <div className="product-card-content">
        <span className="product-category">{product.category}</span>
        <h3>{product.name}</h3>
        <div className="product-meta">
          <strong>{product.displayPrice}</strong>
          <span>★ {product.rating}</span>
        </div>
        <button className="primary-button" type="button" onClick={() => onAddToCart(product)}>
          {cartItem ? `Add another (${cartItem.quantity})` : 'Add to cart'}
        </button>
      </div>
    </article>
  )
})

const ProductGrid = memo(function ProductGrid() {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const cartItems = useSelector((state) => state.cart.cartItems)
  const { category, minPrice, maxPrice, search, sortBy } = useSelector(
    (state) => state.filters,
  )
  const uiError = useSelector((state) => state.ui.error)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setIsLoading(false), 450)
    return () => window.clearTimeout(timeoutId)
  }, [])

  const filteredProducts = useMemo(() => {
    const searchTerm = search.trim().toLowerCase()

    return products.filter((product) => {
      const matchesCategory = category === 'All' || product.category === category
      const matchesPrice = product.price >= minPrice && product.price <= maxPrice
      const matchesSearch = !searchTerm || product.name.toLowerCase().includes(searchTerm)

      return matchesCategory && matchesPrice && matchesSearch
    })
  }, [category, minPrice, maxPrice, search])

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((first, second) => {
      if (sortBy === 'priceLowToHigh') return first.price - second.price
      if (sortBy === 'priceHighToLow') return second.price - first.price
      if (sortBy === 'rating') return second.rating - first.rating
      return new Date(second.createdAt) - new Date(first.createdAt)
    })
  }, [filteredProducts, sortBy])

  const pricedProducts = useMemo(
    () => sortedProducts.map((product) => ({ ...product, displayPrice: formatPrice(product.price) })),
    [sortedProducts],
  )

  const handleAddToCart = useCallback(
    (product) => {
      dispatch(addToCart(product))
      dispatch(showToast({ message: `${product.name} added to your bag.` }))
    },
    [dispatch],
  )

  return (
    <section className="product-section" aria-labelledby="products-heading">
      <div className="section-heading">
        <div>
          <span className="eyebrow">The edit / 06 pieces</span>
          <h2 id="products-heading">Good things, <em>well made.</em></h2>
        </div>
        <span className="result-count">{pricedProducts.length} results <span aria-hidden="true">↘</span></span>
      </div>

      {isLoading ? <LoadingSpinner /> : uiError ? (
        <ErrorState message={uiError} />
      ) : pricedProducts.length === 0 ? (
        <div className="empty-results">
          <h3>No products found</h3>
          <p>Try widening your price range or changing your search.</p>
        </div>
      ) : (
        <div className="product-grid">
          {pricedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              cartItem={cartItems.find((item) => item.id === product.id)}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </section>
  )
})

export default ProductGrid
