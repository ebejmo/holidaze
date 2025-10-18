import Icon from '../ui/Icon';
import { getRatingLabel } from '../../utils/ratingUtils';

export default function VenueSummary({ title, rating, owner }) {
  const avatarUrl = owner?.avatar?.url;
  const avatarAlt = owner?.avatar?.alt || owner?.name || 'Host avatar';
  const hostName = owner?.name || 'Unknown host';

  const isRated = typeof rating === 'number';

  return (
    <div className="mb-4">
      <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between mb-2">
        <h1 className="h4 mb-2 mb-sm-0">{title}</h1>

        {isRated && (
          <span className="badge badge-holidaze">
            {rating.toFixed(1)} {getRatingLabel(rating)}
          </span>
        )}
      </div>

      <div className="d-flex align-items-center gap-2 text-muted small">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={avatarAlt}
            className="rounded-circle venue-avatar"
          />
        ) : (
          <Icon name="user" size="lg" />
        )}
        <span className="text-info">Hosted by {hostName}</span>
      </div>
    </div>
  );
}
