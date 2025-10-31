import Icon from '../ui/Icon';

export default function VenueFacts({ location, price, maxGuests }) {
  const { address, city, country } = location || {};
  const locationText =
    city && country
      ? `${city}, ${country}`
      : city || country || 'Location unknown';

  return (
    <section className="mb-4 venue-facts" aria-label="Venue facts">
      <ul className="list-unstyled d-flex flex-wrap gap-4 small m-0">
        <li className="d-flex align-items-center gap-2 flex-wrap">
          <Icon name="location" size="lg" className="text-secondary" />
          <span>{locationText}</span>
          {address && <span>{address}</span>}
        </li>

        <li className="d-flex align-items-center gap-2 flex-wrap">
          <Icon name="money" size="lg" className="text-secondary" />
          <span>{price ?? 0} kr / night</span>
        </li>

        <li className="d-flex align-items-center gap-2 flex-wrap">
          <Icon name="users" size="lg" className="text-secondary" />
          <span>Max {maxGuests ?? 1} guests</span>
        </li>
      </ul>
    </section>
  );
}
