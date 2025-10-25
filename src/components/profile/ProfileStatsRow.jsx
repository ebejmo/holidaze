import Icon from '../ui/Icon';

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

  const bookingsCount =
    profile?._count?.bookings ?? profile?.bookings?.length ?? 0;
  const venuesCount = profile?._count?.venues ?? profile?.venues?.length ?? 0;

  return (
    <section className="mt-4" aria-label="Profile statistics">
      <div className="row g-3 justify-content-center">
        <div className="col-6 col-md-4 col-lg-3">
          <StatCard icon="calendar" label="Bookings" value={bookingsCount} />
        </div>

        {isHost && (
          <div className="col-6 col-md-4 col-lg-3">
            <StatCard icon="home" label="Venues" value={venuesCount} />
          </div>
        )}
      </div>
    </section>
  );
}
