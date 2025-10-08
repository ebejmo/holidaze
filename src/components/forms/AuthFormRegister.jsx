import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../../schemas/registerSchema';
import { registerUser } from '../../api/auth';
import { useToast } from '../../context/toast/useToast';
import { useModal } from '../../context/modal/useModal';

export default function AuthFormRegister({ onSwitch, role = 'guest' }) {
  const { addToast } = useToast();
  const { closeModal } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const submitLabel = isSubmitting
    ? 'Please wait...'
    : `Register as ${role === 'manager' ? 'Host' : 'Guest'}`;

  async function onSubmit(data) {
    try {
      const payload = {
        ...data,
        venueManager: role === 'manager',
      };
      const result = await registerUser(payload);
      console.log('Register success:', result);

      addToast('Registration successful!', 'success');
      closeModal();
    } catch (error) {
      console.error('Register error:', error);
      addToast(
        error.message || 'Registration failed. Please try again.',
        'danger'
      );
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          {...register('name')}
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
        />
        {errors.name && (
          <p className="text-danger small">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          {...register('email')}
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
        />
        {errors.email && (
          <p className="text-danger small">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          {...register('password')}
          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
        />
        {errors.password && (
          <p className="text-danger small">{errors.password.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Bio (optional)</label>
        <textarea {...register('bio')} className="form-control" rows="2" />
      </div>

      <div className="mb-3">
        <label className="form-label">Avatar URL (optional)</label>
        <input {...register('avatar.url')} className="form-control" />
      </div>

      <button
        type="submit"
        className="btn btn-primary w-100"
        disabled={isSubmitting}
      >
        {submitLabel}
      </button>

      <p className="text-center small mt-3 mb-0">
        Already have an account?{' '}
        <button
          type="button"
          className="btn btn-link p-0 small text-info"
          style={{ font: 'inherit', verticalAlign: 'baseline' }}
          onClick={onSwitch}
        >
          Log in
        </button>
      </p>
    </form>
  );
}
