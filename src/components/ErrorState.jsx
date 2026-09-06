function ErrorState({ message }) {
  return (
    <div
      role="alert"
      className="mx-auto max-w-lg rounded-lg border border-error px-4 py-6 text-center text-error"
    >
      <p>{message}</p>
    </div>
  )
}

export default ErrorState
