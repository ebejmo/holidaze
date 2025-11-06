import Icon from '../ui/Icon';
import { getSafeCount } from '../../utils/profileUtils';

function StatCard({ icon, label, value }) {
  return (
    <div className="stat-card border rounded-3 p-3 text-center h-100">
      <div className="d-flex flex-column align-items-center gap-2">
        <Icon name={icon} size="lg" className="text-primary" />
        <div className="small text-muted">{label}</div>
        <div className="h5 mb-0">{value}</div>
      </div>
    </div>
  );
}

export default function ProfileStatsRow({ profile }) {
  const isHost = !!profile?.venueManager;

  const bookingsCount = getSafeCount(profile, 'bookings');
  const venuesCount = getSafeCount(profile, 'venues');

  return (
    <section className=" profile-stats mt-4" aria-label="Profile statistics">
      <div className="d-flex flex-wrap flex-md-column align-items-center align-items-md-start gap-3">
        <StatCard icon="calendar" label="Bookings" value={bookingsCount} />

        {isHost && <StatCard icon="home" label="Venues" value={venuesCount} />}
      </div>
    </section>
  );
}
