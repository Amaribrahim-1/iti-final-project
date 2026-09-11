function ChatMessage({ message }) {
  const isUser = message.role === 'user'

  return (
    <div className={isUser ? 'flex justify-end' : 'flex justify-start'}>
      <p
        dir="auto"
        className={
          isUser
            ? 'max-w-[80%] rounded-2xl rounded-br-md bg-primary px-4 py-3 text-base leading-relaxed text-dark'
            : 'max-w-[80%] whitespace-pre-wrap rounded-2xl rounded-bl-md bg-surface px-4 py-3 text-base leading-relaxed text-dark [unicode-bidi:plaintext] dark:ring-1 dark:ring-white/20'
        }
      >
        {message.text}
      </p>
    </div>
  )
}

export default ChatMessage
