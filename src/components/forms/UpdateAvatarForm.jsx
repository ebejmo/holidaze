import { useAuth } from '../../context/auth/useAuth';
import { useToast } from '../../context/toast/useToast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateAvatarSchema } from '../../schemas/updateAvatarSchema';
import { updateProfile } from '../../api/profiles';
import { useModal } from '../../context/modal/useModal';
import FormField from './FormField';

export default function UpdateAvatarForm() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const { closeModal } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(updateAvatarSchema),
    mode: 'onTouched',
    defaultValues: { avatar: '' },
  });

  async function onSubmit(values) {
    try {
      const payload = {
        avatar: {
          url: values.avatar.trim(),
          alt: `${user.name}'s profile picture`,
        },
      };

      await updateProfile(user.name, payload);
      addToast('Profile picture updated successfully!', 'success');
      reset();
      closeModal();
      setTimeout(() => window.location.reload(), 800);
    } catch (error) {
      console.error(error);
      addToast(error.message || 'Could not update avatar.', 'danger');
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h4 className="h6 mb-2">Edit profile picture</h4>

      <FormField
        label="URL"
        name="avatar"
        type="url"
        placeholder="https://url.com/image.jpg"
        register={register}
        error={errors.avatar}
        disabled={isSubmitting}
      />

      <button
        type="submit"
        className="btn btn-outline-secondary w-100"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Updating...' : 'Update'}{' '}
      </button>
    </form>
  );
}
