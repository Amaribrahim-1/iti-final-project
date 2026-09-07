import { useState } from 'react'
import { useSearchParams } from 'react-router'

const TABS = [
  { id: 'movies', label: 'Movies' },
  { id: 'tv', label: 'TV Shows' },
]

function parseTab(value) {
  return value === 'tv' ? 'tv' : 'movies'
}

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tabFromUrl = parseTab(searchParams.get('tab'))
  const [activeTab, setActiveTab] = useState(tabFromUrl)

  if (activeTab !== tabFromUrl) {
    setActiveTab(tabFromUrl)
  }

  function handleTabClick(tabId) {
    setActiveTab(tabId)
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.set('tab', tabId)
      return next
    })
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex gap-2" role="tablist" aria-label="Media type">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => handleTabClick(tab.id)}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary text-dark'
                  : 'bg-surface text-muted hover:text-dark'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <div role="tabpanel" className="min-h-64 rounded-lg bg-surface p-6">
        {/* Grid of results will go here */}
      </div>
    </section>
  )
}

export default HomePage
