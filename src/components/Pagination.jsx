import { ChevronLeft, ChevronRight } from 'lucide-react'

function getPageItems(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, 'end-ellipsis', totalPages]
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      'start-ellipsis',
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ]
  }

  return [
    1,
    'start-ellipsis',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    'end-ellipsis',
    totalPages,
  ]
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageItems = getPageItems(currentPage, totalPages)

  return (
    <nav
      className="mt-12 flex items-center justify-center gap-2 border-t border-surface pt-8"
      aria-label="Pagination"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="grid size-10 place-items-center rounded-full bg-surface text-dark transition-colors hover:bg-primary disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={18} aria-hidden="true" />
      </button>

      {pageItems.map((item) =>
        typeof item === 'number' ? (
          <button
            key={item}
            type="button"
            onClick={() => onPageChange(item)}
            aria-current={item === currentPage ? 'page' : undefined}
            className={`grid size-10 place-items-center rounded-full text-sm font-semibold transition-colors ${
              item === currentPage
                ? 'bg-primary text-dark'
                : 'bg-surface text-dark hover:bg-primary/50'
            }`}
          >
            {item}
          </button>
        ) : (
          <span key={item} className="px-1 text-muted" aria-hidden="true">
            &hellip;
          </span>
        ),
      )}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="grid size-10 place-items-center rounded-full bg-surface text-dark transition-colors hover:bg-primary disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight size={18} aria-hidden="true" />
      </button>
    </nav>
  )
}

export default Pagination
