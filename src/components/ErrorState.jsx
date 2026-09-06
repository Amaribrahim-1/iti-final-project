function ErrorState({ message }) {
  return (
    <div
      role="alert"
      className="mx-auto max-w-lg rounded-lg border border-red-200 bg-red-50 px-4 py-6 text-center text-red-700"
    >
      <p>{message}</p>
    </div>
  )
}

export default ErrorState
