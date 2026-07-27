import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../features/cart/cartSlice.js'
import filterReducer from '../features/filters/filterSlice.js'
import uiReducer from '../features/ui/uiSlice.js'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    filters: filterReducer,
    ui: uiReducer,
  },
})
