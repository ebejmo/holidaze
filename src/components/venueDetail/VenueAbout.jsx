export default function VenueAbout({ description, created }) {
  return (
    <section className="venue-about mb-4" aria-label="Venue about">
      <h2 className="h5 mb-2">About this venue</h2>
      {description ? (
        <p className="mb-0">{description}</p>
      ) : (
        <p className="mb-0">No description provided by venue host</p>
      )}

      {created && (
        <div className="pt-2 mt-3 text-muted small">
          Listed on {new Date(created).toLocaleDateString()}
        </div>
      )}
    </section>
  );
}
