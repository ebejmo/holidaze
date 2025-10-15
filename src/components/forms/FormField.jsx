export default function FormField({
  label,
  name,
  register,
  error,
  as = 'input',
  type = 'text',
  helpText,
  className = '',
  ...props
}) {
  const isInvalid = !!error;
  const FieldTag = as;

  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
        </label>
      )}

      <FieldTag
        id={name}
        type={as === 'input' ? type : undefined}
        {...register(name)}
        {...props}
        className={`form-control ${isInvalid ? 'is-invalid' : ''} ${className}`}
        aria-invalid={isInvalid || undefined}
        aria-describedby={helpText ? `${name}-help` : undefined}
      />

      {isInvalid && <p className="text-danger small mb-0">{error.message}</p>}

      {helpText && !isInvalid && (
        <div id={`${name}-help`} className="form-text">
          {helpText}
        </div>
      )}
    </div>
  );
}
