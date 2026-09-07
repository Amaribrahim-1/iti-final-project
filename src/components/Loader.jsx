function Loader() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="flex items-center justify-center py-16"
    >
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-surface border-t-primary" />
    </div>
  )
}

export default Loader
