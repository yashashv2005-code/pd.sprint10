import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  category: 'All',
  minPrice: 0,
  maxPrice: 150000,
  search: '',
  sortBy: 'newest',
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload
    },
    setPriceRange: (state, action) => {
      const { minPrice, maxPrice } = action.payload
      state.minPrice = minPrice
      state.maxPrice = maxPrice
    },
    setSearch: (state, action) => {
      state.search = action.payload
    },
    setSort: (state, action) => {
      state.sortBy = action.payload
    },
    clearFilters: () => initialState,
  },
})

export const {
  setCategory,
  setPriceRange,
  setSearch,
  setSort,
  clearFilters,
} = filterSlice.actions

export default filterSlice.reducer
