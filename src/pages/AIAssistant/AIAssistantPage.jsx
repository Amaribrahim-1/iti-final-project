import { useState } from 'react'
import { Bot } from 'lucide-react'
import ErrorState from '../../components/ErrorState'
import sendChatMessage from '../../api/sendChatMessage'
import formatAssistantReply from '../../utils/formatAssistantReply'
import ChatMessage from './components/ChatMessage'
import ChatInput from './components/ChatInput'
import SuggestedQuestions from './components/SuggestedQuestions'
import ChatTypingIndicator from './components/ChatTypingIndicator'

function AIAssistantPage() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  async function sendMessage(text) {
    const trimmed = text.trim()
    if (!trimmed || isLoading) {
      return
    }

    const userMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      text: trimmed,
    }

    setMessages((previous) => [...previous, userMessage])
    setInput('')
    setIsError(false)
    setIsLoading(true)

    try {
      const replyText = await sendChatMessage([...messages, userMessage])

      const assistantMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        text: formatAssistantReply(replyText),
      }

      setMessages((previous) => [...previous, assistantMessage])
    } catch {
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    sendMessage(input)
  }

  return (
    <div className="mx-auto flex h-[calc(100dvh-4.5rem)] max-w-3xl flex-col overflow-hidden px-4 py-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-dark">
          <Bot size={22} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-dark sm:text-3xl">
            AI Movie Assistant
          </h1>
          <p className="text-sm text-muted">
            Ask anything about movies or TV shows.
          </p>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl bg-background ring-1 ring-dark/10 dark:ring-white/10">
        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain px-4 py-6 sm:px-6">
          {messages.length === 0 ? (
            <>
              <p className="text-center text-base text-muted">
                Ask me about movies or TV shows.
              </p>
              <SuggestedQuestions onSelect={sendMessage} />
            </>
          ) : null}

          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {isLoading ? <ChatTypingIndicator /> : null}

          {isError ? (
            <ErrorState message="Could not get a reply. Please send your message again." />
          ) : null}
        </div>

        <ChatInput
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}

export default AIAssistantPage
