import { useAppModals } from '../../hooks/useAppModals';
import BookingForm from '../forms/BookingForm';

export default function VenueBookingSection({
  isAuthenticated,
  isOwner,
  price,
  maxGuests,
  venueId,
  existingBookings = [],
}) {
  const { openAuthModal } = useAppModals();

  if (isOwner) {
    return (
      <section className="mb-5">
        <h2 className="h5 mb-2">Manage bookings</h2>
        <p className="text-muted small">
          You own this venue. Manage bookings will be here.
        </p>
      </section>
    );
  }

  if (!isAuthenticated) {
    return (
      <section className="mb-5">
        <h2 className="h5 mb-2">Book your stay</h2>
        <p className="text-muted small mb-0">
          Please{' '}
          <button
            type="button"
            className="btn btn-link btn-link-inherit align-baseline"
            onClick={() => openAuthModal('login')}
          >
            log in
          </button>{' '}
          or{' '}
          <button
            type="button"
            className="btn btn-link btn-link-inherit align-baseline"
            onClick={() => openAuthModal('register')}
          >
            register
          </button>{' '}
          to make a reservation.
        </p>
      </section>
    );
  }

  return (
    <section className="mb-5">
      <h2 className="h5 mb-2">Book your stay</h2>

      <BookingForm
        price={price}
        maxGuests={maxGuests}
        venueId={venueId}
        existingBookings={existingBookings}
      />
    </section>
  );
}
