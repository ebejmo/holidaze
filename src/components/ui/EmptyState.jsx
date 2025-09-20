import { Link } from 'react-router-dom';
import Icon from './Icon';

export default function EmptyState({
  icon,
  title,
  body,
  cta,
  variant = 'section',
}) {
  let variantClasses = '';

  switch (variant) {
    case 'inline':
      variantClasses = 'd-flex align-items-center text-muted small py-2';
      break;
    case 'fullpage':
      variantClasses =
        'd-flex flex-column justify-content-center align-items-center text-center';
      break;
    default:
      variantClasses =
        'd-flex flex-column justify-content-center align-items-center py-5 text-center';
      break;
  }

  return (
    <div className={variantClasses}>
      {icon && (
        <div className="mb-3 fs-1">
          <Icon name={icon} />
        </div>
      )}

      <h5>{title}</h5>

      {body && <p className="text-muted">{body}</p>}

      {cta && (
        <Link to={cta.to} className="btn btn-primary mt-3">
          {cta.label}
        </Link>
      )}
    </div>
  );
}
