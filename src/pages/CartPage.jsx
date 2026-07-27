import { useDispatch, useSelector } from 'react-redux'
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from '../features/cart/cartSlice.js'

export default function CartPage() {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.cartItems)
  const totalPrice = useSelector((state) => state.cart.totalPrice)

  return (
    <section aria-labelledby="cart-heading">
      <h2 id="cart-heading">Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <article key={item.id}>
              <h3>{item.name}</h3>
              <p>${(item.price * item.quantity).toFixed(2)}</p>
              <button
                type="button"
                aria-label={`Decrease ${item.name} quantity`}
                onClick={() => dispatch(decreaseQuantity(item.id))}
              >
                −
              </button>
              <span> {item.quantity} </span>
              <button
                type="button"
                aria-label={`Increase ${item.name} quantity`}
                onClick={() => dispatch(increaseQuantity(item.id))}
              >
                +
              </button>
              <button type="button" onClick={() => dispatch(removeFromCart(item.id))}>
                Remove
              </button>
            </article>
          ))}
          <p>Total: ${totalPrice.toFixed(2)}</p>
          <button type="button" onClick={() => dispatch(clearCart())}>
            Clear cart
          </button>
        </>
      )}
    </section>
  )
}
