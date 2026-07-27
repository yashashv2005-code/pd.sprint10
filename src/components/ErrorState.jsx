import { memo } from 'react'

const ErrorState = memo(function ErrorState({ message, onRetry }) {
  return (
    <div className="error-state" role="alert">
      <span className="error-mark" aria-hidden="true">!</span>
      <div>
        <h3>Something went wrong</h3>
        <p>{message}</p>
        {onRetry && <button className="dark-button" type="button" onClick={onRetry}>Try again</button>}
      </div>
    </div>
  )
})

export default ErrorState

