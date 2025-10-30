import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createVenueSchema } from '../../schemas/createVenueSchema';
import { createVenue } from '../../api/venues';
import { useToast } from '../../context/toast/useToast';
import { useModal } from '../../context/modal/useModal';
import HostUpdateFormCore from './HostUpdateFormCore';
import HostUpdateFormMedia from './HostUpdateFormMedia';
import HostUpdateFormAmenities from './HostUpdateFormAmenities';

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

      const media = [];
      if (values.media1) media.push({ url: values.media1, alt: '' });
      if (values.media2) media.push({ url: values.media2, alt: '' });
      if (values.media3) media.push({ url: values.media3, alt: '' });

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
        media: media,
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
      <HostUpdateFormCore
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
      />
      <HostUpdateFormMedia
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
      />
      <HostUpdateFormAmenities
        register={register}
        isSubmitting={isSubmitting}
      />

      <button className="btn btn-primary w-100">
        {isSubmitting ? 'Creating...' : 'Create Venue'}
      </button>
    </form>
  );
}
