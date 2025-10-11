export default function VenueAbout({ description, created }) {
  return (
    <section className="mb-4">
      <h2 className="h5 mb-2">About this venue</h2>
      {description ? (
        <p className="mb-0 text-muted">{description}</p>
      ) : (
        <p className="mb-0 text-muted">No description provided by venue host</p>
      )}

      {created && (
        <div className="pt-2 mt-3 text-muted small">
          Listed on {new Date(created).toLocaleDateString()}
        </div>
      )}
    </section>
  );
}
