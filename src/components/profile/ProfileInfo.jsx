export default function ProfileInfo({ profile, isOwnProfile }) {
  const isHost = !!profile?.venueManager;
  const badgeClass = isHost
    ? 'badge text-bg-secondary'
    : 'badge badge-holidaze';

  const avatarUrl =
    profile?.avatar?.url ||
    'https://placehold.co/100x100/333333/ffffff?text=Avatar';
  const avatarAlt =
    profile?.avatar?.alt || `${profile?.name || 'User'}'s avatar`;

  const bio = profile?.bio?.trim() || 'No bio added yet.';

  return (
    <div className="profile-info text-center mt-3">
      <img
        src={avatarUrl}
        alt={avatarAlt}
        className="profile-avatar rounded-circle mb-3"
      />

      <div className="d-flex justify-content-center align-items-center gap-3 mb-1 mt-3">
        <h1 className="h5 mb-0">{profile?.name || 'User'}</h1>
        <span className={badgeClass}>{isHost ? 'Host' : 'Guest'}</span>
      </div>

      <div className="text-muted small mt-1">
        {profile?.email || 'Email not available'}
      </div>

      <div className="mt-3 about-text mx-auto">
        <h2 className="h6 mb-1">About</h2>
        <p className="text-muted mb-0">{bio}</p>
      </div>

      {isOwnProfile && (
        <button className="btn btn-outline-secondary mt-3">Edit</button>
      )}
    </div>
  );
}
