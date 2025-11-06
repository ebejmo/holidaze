import { Link } from 'react-router-dom';
import Icon from '../ui/Icon';
import { handleImageError } from '../../utils/handleImageError';
import { useToast } from '../../context/toast/useToast';
import { deleteVenue } from '../../api/venues';
import { useAppModals } from '../../hooks/useAppModals';

// re visit when create venue is up and running (styles)
export default function HostVenueCard({ venue }) {
  const { addToast } = useToast();
  const { openUpdateVenueModal } = useAppModals();

  async function handleDeleteVenue() {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${venue.name}?`
    );
    if (!confirmDelete) return;

    try {
      await deleteVenue(venue.id);
      addToast('Venue deleted!', 'success');
      setTimeout(() => window.location.reload(), 800);
    } catch (err) {
      addToast('Failed to delete venue.', 'danger');
      console.log(err);
    }
  }
  const image =
    venue?.media?.[0]?.url || 'https://placehold.co/500x500?text=Holidaze';
  const alt = venue?.media?.[0]?.alt || venue?.name || 'Venue image';
  const city = venue?.location?.city?.trim();
  const country = venue?.location?.country?.trim();
  const locationText =
    city && country
      ? `${city}, ${country}`
      : city || country || 'Location unknown';
  const price = venue?.price ? `${venue.price} kr / night` : null;

  return (
    <div className="host-venue-card list-group-item rounded-3 p-3 mb-2">
      <div className="card-top">
        <img
          src={image}
          alt={alt}
          className="rounded-3"
          onError={handleImageError}
        />

        <div className="venue-info mt-2 mt-md-0">
          <Link
            to={`/venues/${venue.id}`}
            className="h5 mb-1 text-decoration-none"
          >
            {venue?.name || 'Untitled venue'}
          </Link>

          <div className="small-meta text-muted small">
            <Icon name="location" size="sm" className="text-secondary" />
            <span>{locationText}</span>

            {price && (
              <>
                <Icon name="money" size="sm" className="text-secondary" />
                <span>{price}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Fix button styles to be consistent over screen sizes */}
      <div className="mt-3 d-flex flex-column flex-lg-row gap-2">
        <button
          className="btn btn-outline-secondary btn-sm w-100 w-lg-auto flex-fill"
          onClick={() => openUpdateVenueModal(venue)}
        >
          Manage
        </button>
        <button
          onClick={handleDeleteVenue}
          className="btn btn-danger btn-sm w-100 w-lg-auto flex-fill"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
