import VenueCard from '../cards/VenueCard';
import EmptyState from '../ui/EmptyState';

export default function VenueList({ venues }) {
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
    </>
  );
}
