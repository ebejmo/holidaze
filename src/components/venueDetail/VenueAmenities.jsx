import Icon from '../ui/Icon';

export default function VenueAmenities({ meta = [] }) {
  return (
    <section className="mb-4">
      <h2 className="h5 mb-2">Amenities</h2>
      <div className="d-flex flex-wrap gap-3 text-muted small">
        <div className="d-flex align-items-center gap-2">
          <Icon name="wifi" size="lg" />
          <span>{meta.wifi ? 'Wi-Fi included' : 'No Wi-Fi'}</span>
        </div>

        <div className="d-flex align-items-center gap-2">
          <Icon name="parking" size="lg" />
          <span>{meta.parking ? 'Parking available' : 'No parking'}</span>
        </div>

        <div className="d-flex align-items-center gap-2">
          <Icon name="breakfast" size="lg" />
          <span>{meta.breakfast ? 'Breakfast included' : 'No breakfast'}</span>
        </div>

        <div className="d-flex align-items-center gap-2">
          <Icon name="pets" size="lg" />
          <span>{meta.pets ? 'Pets allowed' : 'No pets allowed'}</span>
        </div>
      </div>
    </section>
  );
}
