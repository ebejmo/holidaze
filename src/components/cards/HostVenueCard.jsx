import { Link } from 'react-router-dom';
import Icon from '../ui/Icon';

// re visit when create venue is up and running (styles)
export default function HostVenueCard({ venue }) {
  const image =
    venue?.media?.[0]?.url || 'https://placehold.co/100x80?text=Venue';
  const alt = venue?.media?.[0]?.alt || venue?.name || 'Venue image';
  const location =
    venue?.location?.city || venue?.location?.address || 'Unknown location';
  const bookingsCount = venue?._count?.bookings ?? venue?.bookings?.length ?? 0;
  const price = venue?.price ? `${venue.price} kr / night` : null;

  return (
    <div className="host-venue-card list-group-item rounded-3 p-3 mb-2 d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center">
        <img src={image} alt={alt} className="me-3 rounded-3" />

        <div className="venue-info">
          <Link to={`/venues/${venue.id}`} className="h5 mb-1">
            {venue?.name || 'Untitled venue'}
          </Link>

          <div className="small-meta text-muted small">
            <Icon name="location" size="sm" className="text-secondary" />
            <span>{location}</span>

            <Icon name="users" size="sm" className="text-secondary" />
            <span>{bookingsCount} bookings</span>

            {price && (
              <>
                <Icon name="money" size="sm" className="text-secondary" />
                <span>{price}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="ms-3 d-flex flex-column align-items-end justify-content-end">
        <button className="btn btn-outline-secondary btn-sm">Manage</button>
      </div>
    </div>
  );
}
