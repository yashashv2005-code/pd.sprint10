import { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideToast } from '../features/ui/uiSlice.js'

const ToastNotification = memo(function ToastNotification() {
  const dispatch = useDispatch()
  const toast = useSelector((state) => state.ui.toast)

  useEffect(() => {
    if (!toast) return undefined
    const timeoutId = window.setTimeout(() => dispatch(hideToast()), 2800)
    return () => window.clearTimeout(timeoutId)
  }, [dispatch, toast])

  if (!toast) return null

  return (
    <div className={`toast toast-${toast.tone}`} role="status" aria-live="polite">
      <span className="toast-mark" aria-hidden="true">✓</span>
      <span>{toast.message}</span>
      <button type="button" aria-label="Dismiss notification" onClick={() => dispatch(hideToast())}>×</button>
    </div>
  )
})

export default ToastNotification

