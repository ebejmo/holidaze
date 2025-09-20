export default function FormInput({
  label,
  name,
  type = 'text',
  register,
  errors,
  helpText,
  required = false,
}) {
  const error = errors?.[name];

  return (
    <div className="mb-3">
      {/* Label */}
      <label className="form-label" htmlFor={name}>
        {label} {required && <span className="text-danger">*</span>}
      </label>

      {/* Input */}
      <input
        id={name}
        type={type}
        className={`form-control ${error ? 'is-invalid' : ''}`}
        {...register(name)}
      />

      {/* Error feedback */}
      {error && <div className="invalid-feedback">{error.message}</div>}

      {/* Help text (only if no error) */}
      {!error && helpText && <div className="form-text">{helpText}</div>}
    </div>
  );
}
