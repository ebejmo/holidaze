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
    <div className="host-venue-card list-group-item rounded-3 p-3 mb-2">
      <div className="card-top">
        <img src={image} alt={alt} className="rounded-3" />

        <div className="venue-info mt-2 mt-md-0">
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

      <div className="card-action mt-2 mt-md-0">
        <button className="btn btn-outline-secondary btn-sm">Manage</button>
      </div>
    </div>
  );
}
