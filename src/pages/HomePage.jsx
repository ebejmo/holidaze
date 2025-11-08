import { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import { useNavigate } from 'react-router-dom';
import { ENDPOINTS } from '../config';
import Spinner from '../components/ui/Spinner';
import EmptyState from '../components/ui/EmptyState';
import VenueList from '../components/lists/VenueList';
import Search from '../components/search/Search';
import Pagination from '../components/ui/Pagination';

export default function HomePage() {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const FETCH_LIMIT = 100;
  const PAGE_SIZE = 24;

  const {
    data: venues,
    loading,
    error,
  } = useApi(ENDPOINTS.latestVenues(FETCH_LIMIT));

  const totalPages = venues ? Math.ceil(venues.length / PAGE_SIZE) : 1;
  const startIndex = (page - 1) * PAGE_SIZE;
  const venuesToShow = venues?.slice(startIndex, startIndex + PAGE_SIZE) || [];
  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  useEffect(() => {
    document.title = 'Home | Holidaze';
  }, []);

  const handleResultClick = (id) => {
    navigate(`/venues/${id}`);
  };

  const handleNextPage = () => {
    if (canGoNext) setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (canGoPrev) setPage((prev) => prev - 1);
  };

  if (loading) return <Spinner centered />;
  if (error) return <EmptyState title="Error" body={String(error)} />;

  return (
    <div className="container py-4">
      <section className="text-center mb-5">
        <h1 className="mb-3">Welcome to Holidaze</h1>
        <p className="lead">Find your next dream holidaze.</p>
        <div className="mt-4">
          <Search onResultClick={handleResultClick} />
        </div>
      </section>

      <section>
        <h2 className="mb-3">All Venues</h2>
        <VenueList venues={venuesToShow} />

        <Pagination
          page={page}
          totalPages={totalPages}
          onPrev={handlePrevPage}
          onNext={handleNextPage}
          canGoPrev={canGoPrev}
          canGoNext={canGoNext}
        />
      </section>
    </div>
  );
}
