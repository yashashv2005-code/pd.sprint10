import { memo } from 'react'
import { useSelector } from 'react-redux'

const CartBadge = memo(function CartBadge() {
  const totalItems = useSelector((state) => state.cart.totalItems)

  return <button className="cart-badge" type="button" aria-label={`${totalItems} items in cart`} onClick={() => document.getElementById('cart-heading')?.scrollIntoView({ behavior: 'smooth' })}><span>Bag</span><strong>{String(totalItems).padStart(2, '0')}</strong><span aria-hidden="true">↗</span></button>
})

export default CartBadge
