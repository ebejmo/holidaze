import { useAppModals } from '../../hooks/useAppModals';
import { handleImageError } from '../../utils/handleImageError';

export default function ProfileInfo({ profile, isOwnProfile }) {
  const { openUpdateAvatarModal } = useAppModals();
  const isHost = !!profile?.venueManager;
  const badgeClass = isHost
    ? 'badge text-bg-secondary'
    : 'badge text-bg-primary';

  const avatarUrl =
    profile?.avatar?.url ||
    'https://placehold.co/100x100/333333/ffffff?text=Avatar';
  const avatarAlt =
    profile?.avatar?.alt || `${profile?.name || 'User'}'s avatar`;

  const bio = profile?.bio?.trim() || 'No bio added yet.';

  return (
    <div className="profile-info text-center text-md-start mt-3">
      <img
        src={avatarUrl}
        alt={avatarAlt}
        className="profile-avatar rounded-circle mx-auto mx-md-0 mb-3"
        onError={handleImageError}
      />

      <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start gap-2">
        <h1 className="h5 mb-0">{profile?.name || 'User'}</h1>
        <span className={badgeClass}>{isHost ? 'Host' : 'Guest'}</span>
      </div>

      <div className="text-muted small mt-1">
        {profile?.email || 'Email not available'}
      </div>

      <div className="mt-3 about-text">
        <h2 className="h6 mb-1">About</h2>
        <p className="text-muted mb-0">{bio}</p>
      </div>

      {isOwnProfile && (
        <button
          className="btn btn-outline-secondary mt-3"
          onClick={openUpdateAvatarModal}
        >
          Edit
        </button>
      )}
    </div>
  );
}
