export function Toast({ message, variant, onDismiss }) {
  return (
    <div
      className={`toast align-items-center border-0 show text-bg-${variant}`}
      role="status"
      aria-live="polite"
    >
      <div className="d-flex">
        <div className="toast-body">{message}</div>
        <button
          type="button"
          className="btn-close btn-close-white me-2 m-auto"
          aria-label="Close"
          onClick={onDismiss}
        ></button>
      </div>
    </div>
  );
}
