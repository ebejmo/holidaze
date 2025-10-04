import { useState } from 'react';

export default function AuthForm({ initialMode = 'login', onClose }) {
  const [mode, setMode] = useState(initialMode);
  const [role, setRole] = useState('guest');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(mode === 'login' ? 'Login submit' : 'Register submit', {
      role,
    });
  };

  return (
    <div className="p-3">
      <form onSubmit={handleSubmit}>
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
              className={`btn btn-sm ${
                role === 'manager' ? 'btn-primary' : 'btn-outline-primary'
              }`}
              onClick={() => setRole('manager')}
            >
              Host
            </button>
          </div>
        )}

        {mode === 'register' && (
          <div className="mb-3">
            <label className="form-label">Full name</label>
            <input type="text" className="form-control" required />
          </div>
        )}

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" required />
        </div>

        {mode === 'register' && (
          <div className="mb-3">
            <label className="form-label">Avatar URL (optional)</label>
            <input type="url" className="form-control" />
          </div>
        )}

        <button type="submit" className="btn btn-primary w-100 mb-3">
          {mode === 'login' ? 'Log in' : 'Register'}
        </button>

        <p className="text-center small mb-0">
          {mode === 'login' ? (
            <>
              No account?{' '}
              <a
                href="#"
                className="text-info"
                onClick={() => setMode('register')}
              >
                Register here
              </a>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <a
                href="#"
                className="text-info"
                onClick={() => setMode('login')}
              >
                Log in
              </a>
            </>
          )}
        </p>
      </form>
    </div>
  );
}
