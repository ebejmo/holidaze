import { useAppModals } from '../../hooks/useAppModals';

export default function VenueBookingSection({ isAuthenticated, isOwner }) {
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

  return (
    <section className="mb-5">
      <h2 className="h5 mb-2">Book your stay</h2>

      {!isAuthenticated ? (
        <p className="text-muted small mb-0">
          Please{' '}
          <button
            type="button"
            className="btn btn-link btn-link-inherit text-info align-baseline"
            onClick={() => openAuthModal('login')}
          >
            log in
          </button>{' '}
          or{' '}
          <button
            type="button"
            className=" btn btn-link btn-link-inherit text-info p-0 align-baseline"
            onClick={() => openAuthModal('Register')}
          >
            register
          </button>{' '}
          to make a reservation.
        </p>
      ) : (
        <p className="text-muted small mb-0">Booking form coming...</p>
      )}
    </section>
  );
}
