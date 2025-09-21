import { Link } from 'react-router-dom';

function getRatingLabel(rating) {
  if (rating >= 5) return 'Amazing';
  if (rating >= 3) return 'Great';
  if (rating >= 2) return 'Good';
  if (rating >= 1) return 'Fair';

  return 'Unrated';
}

export default function VenueCard({ venue }) {
  const { id, name, media, location, price, rating } = venue;

  const imageUrl =
    media && media.length > 0
      ? media[0].url
      : 'https://dummyimage.com/600x400/fff/aaa';
  const imageAlt =
    media && media.length > 0 ? media[0].alt || name : `${name} image`;

  const city = location?.city?.trim() || 'N/A';
  const country = location?.country?.trim() || 'N/A';

  return (
    <div className="col-6 col col-md-4 col-lg-3 mb-4">
      <Link
        to={`/venues/${id}`}
        className="card h-100 text-decoration-none text-dark venue-card"
      >
        <div className="card-img-top-wrapper">
          <img src={imageUrl} alt={imageAlt} className="card-img-top" />
        </div>
        <div className="card-body">
          {typeof rating === 'number' && (
            <span className="badge mb-2">
              {rating.toFixed(1)} {getRatingLabel(rating)}
            </span>
          )}
          <h5 className="card-title">{name}</h5>
          <p className="card-text mb-1">
            {city}, {country}
          </p>
          {price !== undefined && <p className="price">{price} kr / night</p>}
        </div>
      </Link>
    </div>
  );
}
