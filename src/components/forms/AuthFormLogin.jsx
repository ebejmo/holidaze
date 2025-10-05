import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../schemas/loginSchema';
import { loginUser } from '../../api/auth';
import { useToast } from '../../context/toast/useToast';
import { useModal } from '../../context/modal/useModal';

export default function AuthFormLogin({ onSwitch }) {
  const { addToast } = useToast();
  const { closeModal } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  async function onSubmit(data) {
    try {
      const result = await loginUser(data);
      console.log('Logged in:', result);

      addToast('Login successful!', 'success');
      closeModal();
    } catch (error) {
      addToast(error.message || 'Login failed. Please try again', 'danger');
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          {...register('email')}
          type="email"
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

      <button
        type="submit"
        className="btn btn-primary w-100"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Please wait...' : 'Log in'}
      </button>

      <p className="text-center small mt-3 mb-0">
        No account?{' '}
        <button
          type="button"
          className="btn btn-link p-0 small text-info"
          style={{ font: 'inherit', verticalAlign: 'baseline' }}
          onClick={onSwitch}
        >
          Register here
        </button>
      </p>
    </form>
  );
}
