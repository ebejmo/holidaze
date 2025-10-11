import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../schemas/loginSchema';
import { loginUser } from '../../api/auth';
import { useToast } from '../../context/toast/useToast';
import { useModal } from '../../context/modal/useModal';
import { useAuth } from '../../context/auth/useAuth';
import Spinner from '../ui/Spinner';

export default function AuthFormLogin({ onSwitch }) {
  const { addToast } = useToast();
  const { closeModal } = useModal();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [redirecting, setRedirecting] = useState(false);

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
      login(result);
      addToast('Login successful!', 'success');
      setRedirecting(true);

      setTimeout(() => {
        closeModal();
        const username = result?.name || result?.data?.name;
        navigate(`/profile/${encodeURIComponent(username)}`);
      });
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
        disabled={isSubmitting || redirecting}
      >
        {isSubmitting
          ? 'Please wait...'
          : redirecting
            ? 'Redirecting...'
            : 'Log in'}
      </button>

      {redirecting && (
        <div
          className="d-flex align-items-center justify-content-center gap-2 mt-3 small text-muted"
          aria-live="polite"
        >
          <Spinner size="sm" />
          <span>Redirecting to your profile…</span>
        </div>
      )}

      <p className="text-center small mt-3 mb-0">
        No account?{' '}
        <button
          type="button"
          className="btn btn-link btn-link-inherit small text-info align-baseline"
          onClick={onSwitch}
        >
          Register here
        </button>
      </p>
    </form>
  );
}
