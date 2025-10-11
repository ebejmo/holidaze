import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth/useAuth';
import { useAppModals } from '../../hooks/useAppModals';
import { useToast } from '../../context/toast/useToast';
import { GuestNav } from './GuestNav';
import UserNav from './UserNav';

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const { openAuthModal } = useAppModals();
  const { addToast } = useToast();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    addToast('You have been logged out.', 'info');
    navigate('/');
  }

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
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>

              {isAuthenticated && (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to={`/profile/${user?.name || ''}`}
                  >
                    Profile
                  </Link>
                </li>
              )}
            </ul>

            {!isAuthenticated ? (
              <GuestNav onAuthClick={openAuthModal} />
            ) : (
              <UserNav onLogout={handleLogout} />
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
