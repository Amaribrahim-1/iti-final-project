function ChatTypingIndicator() {
  return (
    <div className="flex justify-start">
      <p
        role="status"
        aria-label="Assistant is typing"
        className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-surface px-4 py-3 dark:ring-1 dark:ring-white/20"
      >
        <span className="h-2 w-2 animate-bounce rounded-full bg-muted [animation-delay:-0.3s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-muted [animation-delay:-0.15s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-muted" />
      </p>
    </div>
  )
}

export default ChatTypingIndicator
