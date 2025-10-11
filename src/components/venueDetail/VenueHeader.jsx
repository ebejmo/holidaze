import Icon from '../ui/Icon';

export default function VenueHeader({ title, rating, owner }) {
  const avatarUrl = owner?.avatar?.url;
  const avatarAlt = owner?.avatar?.alt || owner?.name || 'Host avatar';
  const hostName = owner?.name || 'Unknown host';
  const ratingValue =
    typeof rating === 'number' ? rating.toFixed(1) : 'Unrated';

  return (
    <div className="mb-3">
      <h1 className="h4 mb-2">{title}</h1>

      <div className="d-flex align-items-center gap-3">
        <span className="text-muted small">Rating: {ratingValue}</span>

        <div className="d-flex align-items-center gap-2">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={avatarAlt}
              width="28"
              height="28"
              className="rounded-circle"
            />
          ) : (
            <Icon name="user" size="lg" />
          )}
          <span className="text-muted small">{hostName}</span>
        </div>
      </div>
    </div>
  );
}
