import { useSelector } from 'react-redux'

export default function CartBadge() {
  const totalItems = useSelector((state) => state.cart.totalItems)

  return <span aria-label={`${totalItems} items in cart`}>Cart ({totalItems})</span>
}

