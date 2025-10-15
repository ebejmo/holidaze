export default function GuestSelector({
  guests,
  maxGuests,
  isSubmitting,
  onChange,
  error,
}) {
  const decrease = () => onChange(guests - 1);
  const increase = () => onChange(guests + 1);

  return (
    <div className="mb-3">
      <label className="form-label">Guests</label>
      <div className="d-flex align-items-center gap-2 max-w-220">
        <button
          type="button"
          className="btn btn-outline-dark"
          onClick={decrease}
          aria-label="Decrease guests"
          disabled={guests <= 1 || isSubmitting}
        >
          –
        </button>

        <span
          className="form-control text-center bg-light border"
          aria-live="polite"
        >
          {guests}
        </span>

        <button
          type="button"
          className="btn btn-outline-dark"
          onClick={increase}
          aria-label="Increase guests"
          disabled={guests >= maxGuests || isSubmitting}
        >
          +
        </button>
      </div>

      {error && <p className="text-danger small mb-0">{error}</p>}
      <div className="form-text">Max guests: {maxGuests}</div>
    </div>
  );
}
