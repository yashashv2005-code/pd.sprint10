import { memo, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, decreaseQuantity, increaseQuantity, removeFromCart } from '../features/cart/cartSlice.js'

const CartItem = memo(function CartItem({ item, onDecrease, onIncrease, onRemove }) {
  const lineTotal = useMemo(() => item.price * item.quantity, [item.price, item.quantity])
  return <article className="cart-item">
    <div className="cart-item-art" aria-hidden="true">{item.name.charAt(0)}</div>
    <div className="cart-item-info"><span>{item.category}</span><h3>{item.name}</h3></div>
    <p>₹{lineTotal.toLocaleString('en-IN')}</p>
    <div className="quantity-control"><button type="button" aria-label={`Decrease ${item.name} quantity`} onClick={() => onDecrease(item.id)}>−</button><span>{item.quantity}</span><button type="button" aria-label={`Increase ${item.name} quantity`} onClick={() => onIncrease(item.id)}>+</button></div>
    <button className="remove-button" type="button" onClick={() => onRemove(item.id)}>Remove</button>
  </article>
})

const CartPage = memo(function CartPage() {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.cartItems)
  const totalPrice = useSelector((state) => state.cart.totalPrice)
  const formattedTotal = useMemo(() => `₹${totalPrice.toLocaleString('en-IN')}`, [totalPrice])
  const handleDecrease = useCallback((id) => dispatch(decreaseQuantity(id)), [dispatch])
  const handleIncrease = useCallback((id) => dispatch(increaseQuantity(id)), [dispatch])
  const handleRemove = useCallback((id) => dispatch(removeFromCart(id)), [dispatch])
  const handleClear = useCallback(() => dispatch(clearCart()), [dispatch])
  return <section className="cart-section" aria-labelledby="cart-heading">
    <div className="cart-heading-row"><div><span className="eyebrow">Your picks</span><h2 id="cart-heading">Your <em>bag.</em></h2></div><span className="cart-summary">{cartItems.length} {cartItems.length === 1 ? 'piece' : 'pieces'}</span></div>
    {cartItems.length === 0 ? <div className="cart-empty"><span aria-hidden="true">✦</span><p>Your bag is waiting for something lovely.</p></div> : <><div className="cart-items">{cartItems.map((item) => <CartItem key={item.id} item={item} onDecrease={handleDecrease} onIncrease={handleIncrease} onRemove={handleRemove} />)}</div><div className="cart-total"><span>Total</span><strong>{formattedTotal}</strong><button className="dark-button" type="button" onClick={handleClear}>Clear bag</button></div></>}
  </section>
})

export default CartPage
