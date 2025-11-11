import { useAppModals } from '../../hooks/useAppModals';
import BookingForm from '../forms/BookingForm';
import ManagerSection from './ManagerSection';

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
      <section
        className="mb-5 venue-booking"
        aria-label="Venue manager section"
      >
        <ManagerSection bookings={existingBookings} venueId={venueId} />
      </section>
    );
  }

  if (!isAuthenticated) {
    return (
      <section
        className="mb-5 sticky-lg-top p-3 rounded bg-white venue-booking z-0"
        aria-label="Venue booking section"
      >
        <h2 className="h5 mb-2">Book your stay</h2>
        <p className="text-muted small mb-0">
          Please{' '}
          <button
            type="button"
            className="btn btn-link btn-link-inherit small text-info align-baseline"
            onClick={() => openAuthModal('login')}
          >
            log in
          </button>{' '}
          or{' '}
          <button
            type="button"
            className="btn btn-link btn-link-inherit small text-info align-baseline"
            onClick={() => openAuthModal('register')}
          >
            register
          </button>{' '}
          to make a booking.
        </p>
      </section>
    );
  }

  return (
    <section
      className="mb-5 p-3 bg-white rounded sticky-lg-top venue-booking"
      aria-label="Venue booking section"
    >
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
