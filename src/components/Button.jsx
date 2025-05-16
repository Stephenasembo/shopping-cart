function RetryBtn({retryFn}) {
  return (
    <button onClick={retryFn}>Retry fetching products</button>
  )
}

export { RetryBtn }