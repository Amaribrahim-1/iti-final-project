import axios from 'axios'

const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent'

const SYSTEM_PROMPT = `You are a movie and TV show assistant for a movie app.
Only answer questions about movies, TV shows, actors, directors, genres, and recommendations.
If the user asks about anything else, politely refuse and tell them you can only help with movies and TV shows.
Reply in the same language the user used.

Output rules:
- Plain text only. No markdown, no asterisks, no bullet symbols, no headings.
- After the intro sentence, put a blank line.
- Each recommendation on its own line, and a blank line between items.
- Never write two titles on the same line.
- Each recommendation line must start with the title (original name), then the year, then a dash, then one short reason in the user's language.
- Give at most 3 recommendations by default.
- If the user asks for more than 3, give the number they asked for.

Exact shape:

Intro sentence here.

Title (year) - short reason

Title (year) - short reason

Title (year) - short reason

One short question at the end.
`

async function sendChatMessage(messages) {
  const contents = messages.map((message) => ({
    role: message.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: message.text }],
  }))

  const response = await axios.post(
    GEMINI_URL,
    {
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents,
    },
    {
      params: {
        key: import.meta.env.VITE_GEMINI_API_KEY,
      },
    },
  )

  const parts = response.data.candidates[0].content.parts
  const replyText = parts
    .filter((part) => part.text && !part.thought)
    .map((part) => part.text)
    .join('\n')

  return replyText
}

export default sendChatMessage
