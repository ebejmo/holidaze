import { Link } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { ENDPOINTS } from '../config';
import EmptyState from '../components/ui/EmptyState';
import Spinner from '../components/ui/Spinner';

export default function HomePage() {
  const { data: venues, loading, error } = useApi(ENDPOINTS.venues);

  if (loading) return <Spinner centered />;
  if (error) return <EmptyState title="Error" body={String(error)} />;
  if (!venues || venues.length === 0) return <EmptyState title="No venues" />;
  return (
    <div className="container py-4">
      <h1 className="mb-3">Holidaze Venues</h1>
      <ul className="list-unstyled">
        {venues.map((venue) => (
          <li key={venue.id} className="mb-2">
            <Link to={`/venues/${venue.id}`} className="text-decoration-none">
              {venue.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
