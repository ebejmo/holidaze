import Icon from '../ui/Icon';

export default function VenueInfo({ location, price, maxGuests }) {
  const { address, city, country } = location || {};

  return (
    <section className="mb-4">
      <div className="d-flex flex-wrap gap-4 text-muted small">
        <div className="d-flex align-items-center gap-2">
          <Icon name="location" size="lg" />
          <span>
            {city && country ? `${city}, ${country}` : 'Location unknown'}
          </span>
          {address && <div className="small text-muted">{address}</div>}
        </div>

        <div className="d-flex align-items-center gap-2">
          <Icon name="money" size="lg" />
          <span>${price ?? 0} / night</span>
        </div>

        <div className="d-flex align-items-center gap-2">
          <Icon name="users" size="lg" />
          <span>Max {maxGuests ?? 1} guests</span>
        </div>
      </div>
    </section>
  );
}
