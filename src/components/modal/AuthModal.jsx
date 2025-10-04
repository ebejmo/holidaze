import { useState } from 'react';
import AuthFormRegister from '../forms/AuthFormRegister';
import AuthFormLogin from '../forms/AuthFormLogin';

export default function AuthModal({ initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode);
  const [role, setRole] = useState('guest');

  return (
    <div className="p-3">
      {mode === 'register' && (
        <div className="mb-3 d-flex gap-2 justify-content-center">
          <button
            type="button"
            className={`btn btn-sm ${role === 'guest' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setRole('guest')}
          >
            Guest
          </button>
          <button
            type="button"
            className={`btn btn-sm ${role === 'manager' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setRole('manager')}
          >
            Host
          </button>
        </div>
      )}

      {mode === 'login' ? (
        <AuthFormLogin onSwitch={() => setMode('register')} />
      ) : (
        <AuthFormRegister onSwitch={() => setMode('login')} role={role} />
      )}
    </div>
  );
}
