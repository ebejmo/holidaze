import { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import { ENDPOINTS } from '../config';

import Spinner from '../components/ui/Spinner';
import EmptyState from '../components/ui/EmptyState';
import VenueList from '../components/lists/VenueList';

const ITEMS_PER_PAGE = 12;

export default function HomePage() {
  const { data: venues, loading, error } = useApi(ENDPOINTS.venues);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    document.title = 'Home | Holidaze';
  }, []);

  if (loading) return <Spinner centered />;
  if (error) return <EmptyState title="Error" body={String(error)} />;

  const venuesToShow = venues ? venues.slice(0, visibleCount) : [];
  const hasMoreVenues = venues ? venues.length > visibleCount : false;

  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + ITEMS_PER_PAGE);
  };

  return (
    <div className="container py-4">
      <section className="text-center mb-5">
        <h1 className="mb-3">Welcome to Holidaze</h1>
        <p className="lead">Find your next dream holidaze.</p>
      </section>

      <section>
        <h2 className="mb-3">All Venues</h2>
        <VenueList
          venues={venuesToShow}
          onMore={handleViewMore}
          hasMore={hasMoreVenues}
        />
      </section>
    </div>
  );
}
