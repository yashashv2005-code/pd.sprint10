import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from './features/cart/cartSlice.js'
import CartBadge from './components/CartBadge.jsx'
import CartPage from './pages/CartPage.jsx'

const products = [
  { id: 'headphones', name: 'Wireless Headphones', price: 79.99 },
  { id: 'keyboard', name: 'Mechanical Keyboard', price: 129.99 },
  { id: 'mouse', name: 'Ergonomic Mouse', price: 49.99 },
]

export default function App() {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.cartItems)

  return (
    <main>
      <header>
        <h1>Store</h1>
        <CartBadge />
      </header>

      <section aria-labelledby="products-heading">
        <h2 id="products-heading">Products</h2>
        {products.map((product) => {
          const cartItem = cartItems.find((item) => item.id === product.id)

          return (
            <article key={product.id}>
              <h3>{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
              <button type="button" onClick={() => dispatch(addToCart(product))}>
                {cartItem ? 'Add another' : 'Add to cart'}
              </button>
            </article>
          )
        })}
      </section>

      <CartPage />
    </main>
  )
}
