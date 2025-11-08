import { useState, useEffect, useMemo } from 'react';
import { useApi } from '../hooks/useApi';
import { useNavigate } from 'react-router-dom';
import { ENDPOINTS } from '../config';
import Spinner from '../components/ui/Spinner';
import EmptyState from '../components/ui/EmptyState';
import VenueList from '../components/lists/VenueList';
import Search from '../components/search/Search';
import SortBy from '../components/ui/SortBy';
import Pagination from '../components/ui/Pagination';

const FETCH_LIMIT = 100;
const PAGE_SIZE = 24;

export default function HomePage() {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('latest');
  const navigate = useNavigate();

  const {
    data: venues,
    loading,
    error,
  } = useApi(ENDPOINTS.latestVenues(FETCH_LIMIT));

  const sortedVenues = useMemo(() => {
    if (!venues) return [];

    const venuesCopy = [...venues];

    switch (sortBy) {
      case 'price':
        return venuesCopy.sort((a, b) => a.price - b.price);
      case 'rating':
        return venuesCopy.sort((a, b) => b.rating - a.rating);
      case 'latest':
      default:
        return venuesCopy.sort(
          (a, b) => new Date(b.created) - new Date(a.created)
        );
    }
  }, [venues, sortBy]);

  const totalPages = venues ? Math.ceil(sortedVenues.length / PAGE_SIZE) : 1;
  const startIndex = (page - 1) * PAGE_SIZE;
  const venuesToShow =
    sortedVenues?.slice(startIndex, startIndex + PAGE_SIZE) || [];
  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  useEffect(() => {
    document.title = 'Home | Holidaze';
  }, []);

  function handleResultClick(id) {
    navigate(`/venues/${id}`);
  }

  function handleNextPage() {
    if (canGoNext) setPage((prev) => prev + 1);
  }

  function handlePrevPage() {
    if (canGoPrev) setPage((prev) => prev - 1);
  }

  function handleSortChange(e) {
    setSortBy(e.target.value);
    setPage(1);
  }

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
        <SortBy value={sortBy} onChange={handleSortChange} />
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
