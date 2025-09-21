import { Link } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { ENDPOINTS } from '../config';
import EmptyState from '../components/ui/EmptyState';
import Spinner from '../components/ui/Spinner';
import VenueCard from '../components/cards/VenueCard';
import { useEffect } from 'react';

export default function HomePage() {
  const { data: venues, loading, error } = useApi(ENDPOINTS.venues);

  useEffect(() => {
    if (venues) {
      console.log('Fetched venues:', venues);
    }
  }, [venues]);

  if (loading) return <Spinner centered />;
  if (error) return <EmptyState title="Error" body={String(error)} />;
  if (!venues || venues.length === 0) return <EmptyState title="No venues" />;
  return (
    <div className="container py-4">
      <h1 className="mb-3">Holidaze Venues</h1>
      <div className="row">
        {venues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    </div>
  );
}
