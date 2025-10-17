export default function ManagerSection({ bookings = [], venueId }) {
  const hasBookings = bookings.length > 0;

  return (
    <>
      <h2 className="h5 mb-2">Manage bookings</h2>
      <p className="small mb-3">
        {hasBookings
          ? 'These are your upcoming bookings.'
          : 'No bookings for this venue yet.'}
      </p>

      {hasBookings && (
        <div className="list-group mb-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="list-group-item d-flex align-items-center justify-content-between"
            >
              <div className="d-flex align-items-center">
                <img
                  src={booking.customer?.avatar?.url}
                  alt={booking.customer?.name}
                  className="rounded-circle me-3"
                  width="48"
                  height="48"
                />
                <div>
                  <h6 className="mb-0">{booking.customer?.name}</h6>
                  <small className="">
                    {new Date(booking.dateFrom).toLocaleDateString()} -{' '}
                    {new Date(booking.dateTo).toLocaleDateString()}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="d-flex flex-column flex-sm-row gap-3">
        <button className="btn btn-outline-secondary flex-fill">
          Manage Venue
        </button>
        <button className="btn btn-danger flex-fill">Delete Venue</button>
      </div>
    </>
  );
}
