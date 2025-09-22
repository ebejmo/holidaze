import VenueCard from '../cards/VenueCard';
import EmptyState from '../ui/EmptyState';

export default function VenueList({ venues, onMore, hasMore }) {
  if (!venues || venues.length === 0) {
    return <EmptyState title="No venues available" />;
  }

  return (
    <>
      <div className="row">
        {venues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>

      <div className="text-center mt-4">
        {hasMore ? (
          <button className="btn btn-outline-secondary" onClick={onMore}>
            View More
          </button>
        ) : (
          <button className="btn btn-outline-secondary" disabled>
            No More Venues
          </button>
        )}
      </div>
    </>
  );
}
