import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { ENDPOINTS } from '../config';
import Spinner from '../components/ui/Spinner';
import EmptyState from '../components/ui/EmptyState';

export default function VenueDetailPage() {
  const { id } = useParams();
  const { data: venue, loading, error } = useApi(ENDPOINTS.venues + '/' + id);

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
      <h1 className="h3">{venue.name}</h1>
      <p className="text-muted">ID: {venue.id}</p>
    </div>
  );
}
