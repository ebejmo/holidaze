import { useApi } from '../hooks/useApi';
import { ENDPOINTS } from '../config';
import EmptyState from '../components/ui/EmptyState';
import Spinner from '../components/ui/Spinner';
import VenueCard from '../components/cards/VenueCard';
import { useEffect, useState } from 'react';
import Icon from '../components/ui/Icon';

export default function HomePage() {
  const { data: venues, loading, error } = useApi(ENDPOINTS.venues);
  const [searchQuery, setSearchQuery] = useState('');

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
      <section className="text-center mb-5">
        <h1 className="mb-3">Welcome to Holidaze</h1>
        <form
          className="d-flex justify-content-center"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="position-relative w-50">
            <Icon
              name="search"
              size={16}
              className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
            />

            <input
              type="text"
              className="form-control ps-5"
              placeholder="Search for a venue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
      </section>

      <section>
        <h2 className="mb-3">All Venues</h2>
      </section>
      <div className="row">
        {venues.slice(0, 12).map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    </div>
  );
}
