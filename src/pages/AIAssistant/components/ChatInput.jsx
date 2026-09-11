import { Send } from 'lucide-react'

function ChatInput({ value, onChange, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className="border-t border-dark/10 p-3 dark:border-white/10 sm:p-4"
    >
      <div className="flex items-stretch overflow-hidden rounded-full bg-surface dark:ring-1 dark:ring-white/15">
        <input
          type="text"
          dir="auto"
          value={value}
          onChange={onChange}
          placeholder="Ask about a movie or TV show..."
          aria-label="Chat message"
          className="w-full min-w-0 bg-transparent px-4 py-3 text-base text-dark placeholder:text-muted focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Send message"
          className="flex items-center justify-center bg-dark px-5 text-background dark:bg-primary dark:text-black"
        >
          <Send size={18} />
        </button>
      </div>
    </form>
  )
}

export default ChatInput
