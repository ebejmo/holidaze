import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/auth/useAuth';
import { getProfile } from '../api/profiles';
import Spinner from '../components/ui/Spinner';
import EmptyState from '../components/ui/EmptyState';
import { ProfileAbout, ProfileStatsRow } from '../components/profile';
import ProfileActivity from '../components/profile/ProfileActivity';

export default function ProfilePage() {
  const { isAuthenticated, user: authUser } = useAuth();
  const { name: routeName } = useParams();
  const targetName = routeName || authUser.name;

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      setLoading(true);
      setError('');
      try {
        const data = await getProfile(targetName);
        if (isMounted) setProfile(data);
      } catch (err) {
        if (isMounted) setError(err.message || 'Failed to load profile');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [targetName]);

  useEffect(() => {
    if (profile?.name) {
      document.title = `${profile.name} | Holidaze`;
    } else {
      document.title = 'Profile | Holidaze';
    }
  }, [profile?.name]);

  if (!isAuthenticated || !authUser) {
    return (
      <EmptyState
        title="Not logged in"
        body="Please signe in to view your Holidaze profile"
      />
    );
  }

  if (loading) return <Spinner centered />;
  if (error) return <EmptyState title="Error" body={String(error)} />;
  if (!profile) return <EmptyState title="Profile not found" />;

  const isOwnProfile =
    authUser.name?.toLowerCase() === profile.name?.toLowerCase();

  return (
    <div className="container py-4">
      <ProfileAbout profile={profile} isOwnProfile={isOwnProfile} />
      <ProfileStatsRow profile={profile} />
      <ProfileActivity profile={profile} isOwnProfile={isOwnProfile} />
    </div>
  );
}
