import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { ENDPOINTS } from '../config';
import Spinner from '../components/ui/Spinner';
import EmptyState from '../components/ui/EmptyState';
import VenueGallery from '../components/venueDetail/VenueGallery';

export default function VenueDetailPage() {
  const { id } = useParams();

  const endpoint = ENDPOINTS.singleVenue
    ? ENDPOINTS.singleVenue(id)
    : `${ENDPOINTS.venues}/${id}?_owner=true&_bookings=true`;

  const { data: venue, loading, error } = useApi(endpoint);

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

      <h1 className="h3">{venue.name}</h1>
      <p className="text-muted">ID: {venue.id}</p>
    </div>
  );
}
