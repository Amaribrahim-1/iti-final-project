const QUESTIONS = [
  'What should I watch if I like Inception?',
  'Recommend 3 TV shows like Breaking Bad',
  'Who directed The Dark Knight?',
]

function SuggestedQuestions({ onSelect }) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {QUESTIONS.map((question) => (
        <button
          key={question}
          type="button"
          onClick={() => onSelect(question)}
          className="rounded-full bg-surface px-4 py-2 text-sm text-dark transition-colors hover:bg-primary/30 dark:ring-1 dark:ring-white/20"
        >
          {question}
        </button>
      ))}
    </div>
  )
}

export default SuggestedQuestions
