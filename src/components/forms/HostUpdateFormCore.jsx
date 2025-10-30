import FormField from './FormField';

export default function HostUpdateFormCore({ register, errors, isSubmitting }) {
  return (
    <>
      <FormField
        label="Name"
        name="name"
        register={register}
        error={errors.name}
        disabled={isSubmitting}
        placeholder="Your venue name"
      />
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
