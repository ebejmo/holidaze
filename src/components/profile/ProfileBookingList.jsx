import MyBookingCard from '../cards/MyBookingsCard';

export default function ProfileBookingList({ bookings, bookingsCount }) {
  const hasBookings = bookingsCount > 0;

  return (
    <section>
      <h3 className="h5 mb-2">My Bookings</h3>
      {hasBookings ? (
        <div className="list-group">
          {bookings.map((booking) => (
            <MyBookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      ) : (
        <p className="text-muted small">No bookings yet. Start exploring!</p>
      )}
    </section>
  );
}
