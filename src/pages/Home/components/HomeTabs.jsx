function HomeTabs({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'movies', label: 'Movies' },
    { id: 'tv', label: 'TV Shows' },
  ]

  return (
    <div className="mb-6 flex gap-2" role="tablist" aria-label="Media type">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onTabChange(tab.id)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              isActive
                ? 'bg-primary text-dark'
                : 'bg-surface text-muted hover:bg-primary/30 hover:text-dark'
            }`}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

export default HomeTabs
