import HostVenueCard from '../cards/HostVenueCard';
import MyBookingCard from '../cards/MyBookingsCard';
import ProfileList from './ProfileList';

export default function ProfileActivity({ profile, isOwnProfile }) {
  const isHost = !!profile?.venueManager;

  const bookingsCount =
    profile?._count?.bookings ?? profile?.bookings?.length ?? 0;
  const venuesCount = profile?._count?.venues ?? profile?.venues?.length ?? 0;

  const hasBookings = bookingsCount > 0;
  const hasVenues = venuesCount > 0;

  return (
    <section className="mt-4" aria-label="Profile activity">
      {isHost && (
        <div className="mb-5">
          <h3 className="h5 d-flex mb-2">My Venues</h3>

          {hasVenues ? (
            <ProfileList>
              {profile.venues.map((venue) => (
                <HostVenueCard key={venue.id} venue={venue} />
              ))}
            </ProfileList>
          ) : (
            <div className="mt-2">
              <p className="text-muted small mb-3">No venues yet</p>

              {isOwnProfile && (
                <button type="button" className="btn btn-primary btn-sm">
                  Create Venue
                </button>
              )}
            </div>
          )}
        </div>
      )}

      <div>
        <h3 className="h5 d-flex align-items-center gap-2 mb-2">My Bookings</h3>
        {hasBookings ? (
          <ProfileList>
            {profile.bookings.map((booking) => (
              <MyBookingCard key={booking.id} booking={booking} />
            ))}
          </ProfileList>
        ) : (
          <div>
            <p className="text-muted small mb-3">
              No bookings yet. Start exploring!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
