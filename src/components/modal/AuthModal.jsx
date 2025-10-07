import { useEffect, useState } from 'react';
import AuthFormRegister from '../forms/AuthFormRegister';
import AuthFormLogin from '../forms/AuthFormLogin';
import { useModal } from '../../context/modal/useModal';

export default function AuthModal({ initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode);
  const [role, setRole] = useState('guest');
  const { setTitle } = useModal();

  useEffect(() => {
    setTitle(mode === 'login' ? 'Log in' : 'Register');
  }, [mode, setTitle]);

  return (
    <div className="p-3">
      {mode === 'login' ? (
        <p className="text-center small text-muted mb-2" aria-live="polite">
          Log in to your Holidaze account
        </p>
      ) : (
        <>
          <p className="text-center small text-muted mb-2" aria-live="polite">
            Register as a {role === 'manager' ? 'host' : 'guest'}
          </p>

          <div
            className="mb-3 d-flex gap-2 justify-content-center"
            role="group"
            aria-label="Choose account type"
          >
            <button
              type="button"
              className={`btn btn-sm ${role === 'guest' ? 'btn-primary' : 'btn-outline-primary'}`}
              aria-pressed={role === 'guest'}
              onClick={() => setRole('guest')}
            >
              Guest
            </button>
            <button
              type="button"
              className={`btn btn-sm ${role === 'manager' ? 'btn-primary' : 'btn-outline-primary'}`}
              aria-pressed={role === 'manager'}
              onClick={() => setRole('manager')}
            >
              Host
            </button>
          </div>
        </>
      )}

      {mode === 'login' ? (
        <AuthFormLogin onSwitch={() => setMode('register')} />
      ) : (
        <AuthFormRegister onSwitch={() => setMode('login')} role={role} />
      )}
    </div>
  );
}
