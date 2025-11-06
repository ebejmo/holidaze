const AMENITIES = [
  { key: 'wifi', label: 'Wi-Fi' },
  { key: 'parking', label: 'Parking' },
  { key: 'breakfast', label: 'Breakfast' },
  { key: 'pets', label: 'Pets' },
];

export default function HostCreateFormAmenities({ register, isSubmitting }) {
  return (
    <>
      <h4 className="h6 mb-2">Amenities</h4>
      <div className="row g-2 mb-3">
        {AMENITIES.map(({ key, label }) => (
          <div className="col-6" key={key}>
            <div className="form-check">
              <input
                id={key}
                type="checkbox"
                className="form-check-input"
                {...register(key)}
                disabled={isSubmitting}
              />
              <label className="form-check-label" htmlFor={key}>
                {label}
              </label>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
