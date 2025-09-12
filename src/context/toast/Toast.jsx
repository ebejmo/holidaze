export function Toast({ message, variant, onDismiss }) {
  return (
    <div
      className={`toast align-items-center text-bg-${variant} border-0 show`}
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
