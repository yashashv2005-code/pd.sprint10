import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItems: [],
  totalItems: 0,
  totalPrice: 0,
}

const getQuantity = (item) => Math.max(1, Number(item.quantity) || 1)
const getPrice = (item) => Number(item.price) || 0

const recalculateTotals = (state) => {
  state.totalItems = state.cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  )
  state.totalPrice = state.cartItems.reduce(
    (total, item) => total + getPrice(item) * item.quantity,
    0,
  )
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload
      const quantity = getQuantity(item)
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.id === item.id,
      )

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        state.cartItems.push({ ...item, quantity })
      }

      recalculateTotals(state)
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload,
      )
      recalculateTotals(state)
    },
    increaseQuantity: (state, action) => {
      const item = state.cartItems.find((cartItem) => cartItem.id === action.payload)

      if (item) {
        item.quantity += 1
        recalculateTotals(state)
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find((cartItem) => cartItem.id === action.payload)

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1
        } else {
          state.cartItems = state.cartItems.filter(
            (cartItem) => cartItem.id !== action.payload,
          )
        }

        recalculateTotals(state)
      }
    },
    clearCart: (state) => {
      state.cartItems = []
      state.totalItems = 0
      state.totalPrice = 0
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions

export default cartSlice.reducer

