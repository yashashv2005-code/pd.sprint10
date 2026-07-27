import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../features/cart/cartSlice.js'
import filterReducer from '../features/filters/filterSlice.js'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    filters: filterReducer,
  },
})
