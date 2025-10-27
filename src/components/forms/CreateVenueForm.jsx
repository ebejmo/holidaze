import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createVenueSchema } from '../../schemas/createVenueSchema';
import { createVenue } from '../../api/venues';
import { useToast } from '../../context/toast/useToast';
import { useModal } from '../../context/modal/useModal';
import FormField from './FormField';

export default function CreateVenueForm({ profile, onSuccess }) {
  const { addToast } = useToast();
  const { closeModal } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(createVenueSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      description: '',
      price: '',
      maxGuests: '1',
    },
  });

  async function onSubmit(values) {
    try {
      if (!profile?.venueManager) {
        throw new Error('Only hosts can create venues');
      }

      const payload = {
        name: values.name.trim(),
        description: values.description.trim(),
        price: Number(values.price),
        maxGuests: Number(values.maxGuests),
      };

      const createdVenue = await createVenue(payload);
      addToast('Venue created successfully!', 'success');
      reset();
      closeModal();
      onSuccess?.(createdVenue);
    } catch (error) {
      addToast(error.message || 'Could not create venue.', 'danger');
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormField
        label="Name"
        name="name"
        register={(n) => ({
          ...register(n),
          onChange: (e) => {
            register(n).onChange(e);
          },
        })}
        error={errors.name}
        disabled={isSubmitting}
        placeholder="House at the beach"
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
            inputMode="decimal"
            min="0"
            step="1"
            register={register}
            error={errors.price}
            disabled={isSubmitting}
            helpText="Enter price per night"
          />
        </div>

        <div className="col-6">
          <FormField
            label="Max guests"
            name="maxGuests"
            type="number"
            inputMode="numeric"
            min="1"
            max="12"
            step="1"
            register={register}
            error={errors.maxGuests}
            disabled={isSubmitting}
          />
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary w-100"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Creating' : 'Create Venue'}
      </button>

      <p className="text-muted small mt-2 mb-0">
        Add rest of stuff once we get this going
      </p>
    </form>
  );
}
