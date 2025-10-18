import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/auth/useAuth';
import { useApi } from '../hooks/useApi';
import { ENDPOINTS } from '../config';
import Spinner from '../components/ui/Spinner';
import EmptyState from '../components/ui/EmptyState';
import {
  VenueGallery,
  VenueSummary,
  VenueFacts,
  VenueAbout,
  VenueAmenities,
  VenueBookingSection,
} from '../components/venueDetail';

export default function VenueDetailPage() {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();

  const endpoint = `${ENDPOINTS.venues}/${id}?_owner=true&_bookings=true`;
  const { data: venue, loading, error } = useApi(endpoint);

  const isOwner =
    isAuthenticated &&
    venue?.owner?.name?.trim().toLowerCase() ===
      user?.name?.trim().toLowerCase();

  useEffect(() => {
    if (venue?.name) {
      document.title = `${venue.name} | Holidaze`;
    }
  }, [venue]);

  if (loading) return <Spinner centered />;
  if (error) return <EmptyState title="Error" body={String(error)} />;
  if (!venue) return <EmptyState title="Venue not found" />;

  return (
    <div className="container py-4">
      <div className="row g-3">
        <div className="col-12 col-lg-7">
          <VenueGallery media={venue.media} title={venue.name} />
          <VenueSummary
            title={venue.name}
            rating={venue.rating}
            owner={venue.owner}
          />
          <VenueFacts
            location={venue.location}
            price={venue.price}
            maxGuests={venue.maxGuests}
          />
          <VenueAbout description={venue.description} created={venue.created} />
          <VenueAmenities meta={venue.meta} />
        </div>

        <div className="col-12 col-lg-5">
          <VenueBookingSection
            isAuthenticated={isAuthenticated}
            isOwner={isOwner}
            price={venue.price}
            maxGuests={venue.maxGuests}
            venueId={venue.id}
            existingBookings={venue.bookings}
          />
        </div>
      </div>
    </div>
  );
}
