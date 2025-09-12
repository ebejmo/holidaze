import { useAuth } from '../context/auth/useAuth';

function ProfilePage() {
  const { user } = useAuth();

  return <h1>{user ? `${user.name}` : 'Not logged in'}</h1>;
}

export default ProfilePage;
