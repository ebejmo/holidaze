import { Link } from 'react-router-dom';
import { useAuth } from '../../context/auth/useAuth';
import { useModal } from '../../context/modal/useModal';
import AuthModal from '../modal/AuthModal';

export default function Header() {
  const { isAuthenticated, user, isManager, logout } = useAuth();
  const { openModal } = useModal();

  const handleOpenAuth = (mode) => {
    const title = mode === 'login' ? 'Login' : 'Register';
    const content = <AuthModal initialMode={mode} />;

    openModal(content, title);
  };

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-light bg-light border-bottom">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            Holidaze
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/venues/1">
                  Venues
                </Link>
              </li>

              {!isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <div className="d-flex flex-column flex-md-row gap-2 w-100">
                      <button
                        className="btn btn-primary flex-fill"
                        onClick={() => handleOpenAuth('login')}
                      >
                        Login
                      </button>
                      <button
                        className="btn btn-outline-primary flex-fill"
                        onClick={() => handleOpenAuth('register')}
                      >
                        Register
                      </button>
                    </div>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      {user?.name || 'Profile'}
                    </Link>
                  </li>
                  {isManager && (
                    <li className="nav-item">
                      <Link className="nav-link" to="/manage">
                        Manage
                      </Link>
                    </li>
                  )}
                  <li className="nav-item">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
