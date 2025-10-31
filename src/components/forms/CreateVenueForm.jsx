import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createVenueSchema } from '../../schemas/createVenueSchema';
import { createVenue } from '../../api/venues';
import { useToast } from '../../context/toast/useToast';
import { useModal } from '../../context/modal/useModal';
import HostCreateFormCore from './HostCreateFormCore';
import HostCreateFormMedia from './HostCreateFormMedia';
import HostCreateFormAmenities from './HostCreateFormAmenities';

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
      address: '',
      city: '',
      country: '',
      description: '',
      price: '',
      maxGuests: '1',
      media1: '',
      media2: '',
      media3: '',
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
  });

  async function onSubmit(values) {
    try {
      if (!profile?.venueManager) {
        throw new Error('Only hosts can create venues');
      }

      const media = [values.media1, values.media2, values.media3]
        .filter(Boolean)
        .map((url) => ({ url: url.trim(), alt: '' }));

      const location = {
        address: values.address?.trim() || '',
        city: values.city?.trim() || '',
        country: values.country?.trim() || '',
      };

      const payload = {
        name: values.name.trim(),
        description: values.description.trim(),
        price: Number(values.price),
        maxGuests: Number(values.maxGuests),
        meta: {
          wifi: !!values.wifi,
          parking: !!values.parking,
          breakfast: !!values.breakfast,
          pets: !!values.pets,
        },
        media,
        location,
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
      <HostCreateFormCore
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
      />
      <HostCreateFormMedia
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
      />
      <HostCreateFormAmenities
        register={register}
        isSubmitting={isSubmitting}
      />

      <button className="btn btn-primary w-100">
        {isSubmitting ? 'Creating...' : 'Create Venue'}
      </button>
    </form>
  );
}
