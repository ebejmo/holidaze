import { Link } from 'react-router-dom';
import Icon from '../ui/Icon';
import { handleImageError } from '../../utils/handleImageError';

export default function MyBookingCard({ booking }) {
  const venue = booking?.venue;
  const image =
    venue?.media?.[0]?.url || 'https://placehold.co/100x80?text=Venue';
  const alt = venue?.media?.[0]?.alt || venue?.name || 'Venue image';
  const title = venue?.name || 'Untitled Venue';

  const startDate = new Date(booking.dateFrom).toLocaleDateString();
  const endDate = new Date(booking.dateTo).toLocaleDateString();

  const isUpcoming = new Date(booking.dateFrom) > new Date();
  const statusClass = isUpcoming ? 'upcoming' : 'completed';
  const statusLabel = isUpcoming ? 'Upcoming' : 'Completed';

  return (
    <Link
      to={`/venues/${venue?.id}`}
      className="list-group-item booking-card rounded-3 p-3 mb-2"
    >
      <div className="card-top">
        <img
          src={image}
          alt={alt}
          className="rounded-3"
          onError={handleImageError}
        />

        <div className="booking-info mt-2 mt-md-0">
          <h5 className="mb-1">{title}</h5>
          <div className="small-meta text-muted small">
            <Icon name="calendar" size="sm" className="text-secondary" />
            <span>
              {startDate} - {endDate}
            </span>
            {booking?.guests && (
              <>
                <Icon name="users" size="sm" className="text-secondary" />
                <span>{booking.guests} guests</span>
              </>
            )}
            {venue?.price && (
              <>
                <Icon name="money" size="sm" className="text-secondary" />
                <span>{venue.price} kr / night</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="card-action mt-2 mt-md-0">
        <span className={`badge-holidaze badge ${statusClass}`}>
          {statusLabel}
        </span>
      </div>
    </Link>
  );
}
