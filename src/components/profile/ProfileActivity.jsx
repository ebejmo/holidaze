import { useAppModals } from '../../hooks/useAppModals';
import HostVenueCard from '../cards/HostVenueCard';
import ProfileBookingList from './ProfileBookingList';
import { getSafeCount } from '../../utils/profileUtils';

export default function ProfileActivity({ profile, isOwnProfile }) {
  const { openCreateVenueModal } = useAppModals();

  const isHost = !!profile?.venueManager;
  const venuesCount = getSafeCount(profile, 'venues');
  const hasVenues = venuesCount > 0;

  return (
    <section className="profile-activity mt-4" aria-label="Profile activity">
      {isHost ? (
        <div className="row g-4">
          <div className="col-12 col-lg-6">
            <h3 className="h5 mb-2">My Venues</h3>

            {hasVenues ? (
              <div>
                <div className="list-group">
                  {profile.venues.map((venue) => (
                    <HostVenueCard
                      key={venue.id}
                      venue={venue}
                      isOwnProfile={isOwnProfile}
                    />
                  ))}
                </div>

                <div className="mt-3">
                  {isOwnProfile && (
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => openCreateVenueModal(profile)}
                    >
                      Create Venue
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="mt-2">
                <p className="text-muted small mb-3">No venues yet</p>

                {isOwnProfile && (
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => openCreateVenueModal(profile)}
                  >
                    Create Venue
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="col-12 col-lg-6">
            <ProfileBookingList
              bookings={profile.bookings}
              bookingsCount={getSafeCount(profile, 'bookings')}
            />
          </div>
        </div>
      ) : (
        <ProfileBookingList
          bookings={profile.bookings}
          bookingsCount={getSafeCount(profile, 'bookings')}
        />
      )}
    </section>
  );
}
