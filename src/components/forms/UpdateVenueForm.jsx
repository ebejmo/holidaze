import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createVenueSchema } from '../../schemas/createVenueSchema';
import { useToast } from '../../context/toast/useToast';
import { useModal } from '../../context/modal/useModal';
import { updateVenue } from '../../api/venues';
import HostCreateFormCore from './HostCreateFormCore';
import HostCreateFormAmenities from './HostCreateFormAmenities';
import HostCreateFormMedia from './HostCreateFormMedia';

export default function UpdateVenueForm({ venue }) {
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
  });

  useEffect(() => {
    if (venue) {
      reset({
        name: venue.name || '',
        description: venue.description || '',
        price: venue.price || '',
        maxGuests: venue.maxGuests || '1',
        address: venue.location?.address || '',
        city: venue.location?.city || '',
        country: venue.location?.country || '',
        media1: venue.media?.[0]?.url || '',
        media2: venue.media?.[1]?.url || '',
        media3: venue.media?.[2]?.url || '',
        wifi: venue.meta?.wifi || false,
        parking: venue.meta?.parking || false,
        breakfast: venue.meta?.breakfast || false,
        pets: venue.meta?.pets || false,
      });
    }
  }, [venue, reset]);

  async function onSubmit(values) {
    try {
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

      await updateVenue(venue.id, payload);
      addToast('Venue updated successfully!', 'success');
      reset();
      closeModal();
      setTimeout(() => window.location.reload(), 800);
      window.location.reload();
    } catch (error) {
      addToast(error.message || 'Could not update venue.', 'danger');
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

      <button
        type="submit"
        className="btn btn-outline-secondary w-100"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Updating...' : 'Update'}
      </button>
    </form>
  );
}
