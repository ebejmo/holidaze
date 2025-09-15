export default function Spinner({
  centered = false,
  size = 'md',
  color = 'primary',
}) {
  const sizeClass = size === 'sm' ? 'spinner-border-sm' : '';

  const spinner = (
    <div className={`spinner-border text-${color} ${sizeClass}`} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );

  if (centered) {
    return (
      <div className="d-flex justify-content-center align-items-center w-100 py-5">
        {spinner}
      </div>
    );
  }

  return spinner;
}
