import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../../schemas/registerSchema';
import { registerUser } from '../../api/auth';
import { useToast } from '../../context/toast/useToast';
import { useModal } from '../../context/modal/useModal';
import FormField from './FormField';

export default function AuthFormRegister({ onSwitch, role = 'guest' }) {
  const { addToast } = useToast();
  const { closeModal } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: 'onTouched',
  });

  async function onSubmit(data) {
    try {
      const payload = {
        ...data,
        venueManager: role === 'manager',
      };
      await registerUser(payload);
      addToast('Registration successful!', 'success');
      closeModal();
    } catch (error) {
      addToast(
        error.message || 'Registration failed. Please try again.',
        'danger'
      );
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormField
        label="Name"
        name="name"
        register={register}
        error={errors.name}
        disabled={isSubmitting}
      />

      <FormField
        label="Email"
        name="email"
        type="email"
        register={register}
        error={errors.email}
        disabled={isSubmitting}
      />

      <FormField
        label="Password"
        name="password"
        type="password"
        register={register}
        error={errors.password}
        disabled={isSubmitting}
      />

      <FormField
        label="Bio (optional)"
        name="bio"
        as="textarea"
        rows="2"
        register={register}
        error={errors.bio}
        disabled={isSubmitting}
      />

      <FormField
        label="Avatar URL (optional)"
        name="avatar.url"
        type="url"
        register={register}
        error={errors.avatar?.url}
        disabled={isSubmitting}
      />

      <button
        type="submit"
        className="btn btn-primary w-100"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? 'Registering…'
          : `Register as ${role === 'manager' ? 'Host' : 'Guest'}`}
      </button>

      <p className="text-center small mt-3 mb-0">
        Already have an account?{' '}
        <button
          type="button"
          className="btn btn-link btn-link-inherit small text-info align-baseline"
          onClick={onSwitch}
          disabled={isSubmitting}
        >
          Log in
        </button>
      </p>
    </form>
  );
}
