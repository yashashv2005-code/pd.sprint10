import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  toast: null,
  error: null,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showToast: (state, action) => {
      state.toast = { message: action.payload.message, tone: action.payload.tone ?? 'success' }
    },
    hideToast: (state) => {
      state.toast = null
    },
    setUiError: (state, action) => {
      state.error = action.payload
    },
    clearUiError: (state) => {
      state.error = null
    },
  },
})

export const { showToast, hideToast, setUiError, clearUiError } = uiSlice.actions
export default uiSlice.reducer

