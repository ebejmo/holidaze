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
      <label className="form-label" htmlFor={name}>
        {label} {required && <span className="text-danger">*</span>}
      </label>

      <input
        id={name}
        type={type}
        className={`form-control ${error ? 'is-invalid' : ''}`}
        {...register(name)}
      />

      {error && <div className="invalid-feedback">{error.message}</div>}

      {!error && helpText && <div className="form-text">{helpText}</div>}
    </div>
  );
}
