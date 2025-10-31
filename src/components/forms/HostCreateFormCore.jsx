import FormField from './FormField';

export default function HostCreateFormCore({ register, errors, isSubmitting }) {
  return (
    <>
      <h4 className="h6 mb-2">Venue details</h4>

      <FormField
        label="Name"
        name="name"
        register={register}
        error={errors.name}
        disabled={isSubmitting}
        placeholder="Your venue name"
      />

      <div className="row">
        <div className="col-12">
          <FormField
            label="Address"
            name="address"
            register={register}
            error={errors.address}
            disabled={isSubmitting}
            placeholder="Street or road"
          />
        </div>
        <div className="col-6">
          <FormField
            label="City"
            name="city"
            register={register}
            error={errors.city}
            disabled={isSubmitting}
            placeholder="City"
          />
        </div>
        <div className="col-6">
          <FormField
            label="Country"
            name="country"
            register={register}
            error={errors.country}
            disabled={isSubmitting}
            placeholder="Country"
          />
        </div>
      </div>

      <FormField
        label="Description"
        name="description"
        as="textarea"
        rows="3"
        register={register}
        error={errors.description}
        disabled={isSubmitting}
        placeholder="Describe your venue"
      />

      <div className="row">
        <div className="col-6">
          <FormField
            label="Price per night"
            name="price"
            type="number"
            register={register}
            error={errors.price}
            disabled={isSubmitting}
          />
        </div>

        <div className="col-6">
          <FormField
            label="Max guests"
            name="maxGuests"
            type="number"
            register={register}
            error={errors.name}
            disabled={isSubmitting}
          />
        </div>
      </div>
    </>
  );
}
