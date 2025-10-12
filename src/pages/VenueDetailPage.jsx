import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/auth/useAuth';
import { useApi } from '../hooks/useApi';
import { ENDPOINTS } from '../config';
import Spinner from '../components/ui/Spinner';
import EmptyState from '../components/ui/EmptyState';
import VenueGallery from '../components/venueDetail/VenueGallery';
import VenueHeader from '../components/venueDetail/VenueHeader';
import VenueInfo from '../components/venueDetail/VenueInfo';
import VenueAbout from '../components/venueDetail/VenueAbout';
import VenueAmenities from '../components/venueDetail/VenueAmenities';
import VenueBookingSection from '../components/venueDetail/VenueBookingSection';

export default function VenueDetailPage() {
  const { id } = useParams();

  const endpoint = ENDPOINTS.singleVenue
    ? ENDPOINTS.singleVenue(id)
    : `${ENDPOINTS.venues}/${id}?_owner=true&_bookings=true`;

  const { data: venue, loading, error } = useApi(endpoint);
  const { user, isAuthenticated } = useAuth();
  const isOwner = venue?.owner?.name === user?.name;

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
      <VenueGallery media={venue.media} title={venue.name} />
      <VenueHeader
        title={venue.name}
        rating={venue.rating}
        owner={venue.owner}
      />
      <VenueInfo
        location={venue.location}
        price={venue.price}
        maxGuests={venue.maxGuests}
      />
      <VenueAbout description={venue.description} created={venue.created} />
      <VenueAmenities meta={venue.meta} />
      <VenueBookingSection
        isAuthenticated={isAuthenticated}
        isOwner={isOwner}
        price={venue.price}
        maxGuests={venue.maxGuests}
        venueId={venue.id}
        existingBookings={venue.bookings}
      />
    </div>
  );
}
