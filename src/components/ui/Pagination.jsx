export default function Pagination({
  page,
  totalPages,
  onPrev,
  onNext,
  canGoPrev,
  canGoNext,
}) {
  return (
    <div className="d-flex justify-content-between align-items-center mt-4">
      <button
        type="button"
        className="btn btn-outline-secondary btn-sm"
        onClick={onPrev}
        disabled={!canGoPrev}
      >
        Previous
      </button>
      <span className="small text-muted mb-0">
        Page {page} of {totalPages}
      </span>

      <button
        type="button"
        className="btn btn-outline-secondary btn-sm"
        onClick={onNext}
        disabled={!canGoNext}
      >
        Next
      </button>
    </div>
  );
}
