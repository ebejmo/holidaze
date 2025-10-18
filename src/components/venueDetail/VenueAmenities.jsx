import Icon from '../ui/Icon';

export function AmenityItem({ icon, isAvailable, text }) {
  const textColor = isAvailable ? '' : 'text-muted';
  const iconColor = isAvailable ? 'text-secondary' : 'text-muted';

  return (
    <div className="d-flex align-items-center gap-2">
      <Icon name={icon} size="lg" className={iconColor} />
      <span className={textColor}>{text}</span>
    </div>
  );
}

export default function VenueAmenities({ meta = {} }) {
  const AMENITIES = [
    { key: 'wifi', icon: 'wifi', yes: 'Wi-Fi included', no: 'No Wi-Fi' },
    {
      key: 'parking',
      icon: 'parking',
      yes: 'Parking available',
      no: 'No parking',
    },
    {
      key: 'breakfast',
      icon: 'breakfast',
      yes: 'Breakfast included',
      no: 'No breakfast',
    },
    { key: 'pets', icon: 'pets', yes: 'Pets allowed', no: 'No pets allowed' },
  ];

  return (
    <section className="venue-amenities mb-4" aria-label="Venue amenities">
      <h2 className="h5 mb-2">Amenities</h2>

      <div className="d-flex flex-wrap gap-3 small">
        {AMENITIES.map(({ key, icon, yes, no }) => {
          const isAvailable = meta?.[key];

          return (
            <AmenityItem
              key={key}
              icon={icon}
              isAvailable={isAvailable}
              text={isAvailable ? yes : no}
            />
          );
        })}
      </div>
    </section>
  );
}
