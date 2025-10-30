import { Link } from 'react-router-dom';
import { getRatingLabel } from '../../utils/ratingUtils';

export default function VenueCard({ venue }) {
  const { id, name, media, location, price, rating } = venue;

  const imageUrl =
    media && media.length > 0
      ? media[0].url
      : 'https://placehold.co/600x400/orange/white?text=Holidaze';
  const imageAlt =
    media && media.length > 0 ? media[0].alt || name : `${name} image`;

  const city = venue?.location?.city?.trim();
  const country = venue?.location?.country?.trim();
  const locationText =
    city && country
      ? `${city}, ${country}`
      : city || country || 'Location unknown';

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
            <span className="badge badge-holidaze mb-3">
              {rating.toFixed(1)} {getRatingLabel(rating)}
            </span>
          )}
          <h5 className="card-title mb-2">{name}</h5>
          <p className="card-text mb-2">{locationText}</p>
          {price !== undefined && <p className="price">{price} kr / night</p>}
        </div>
      </Link>
    </div>
  );
}
