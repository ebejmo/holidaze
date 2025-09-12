import { useAuth } from '../context/useAuth';

function ProfilePage() {
  const { user } = useAuth();

  return <h1>{user ? `${user.name}` : 'Not logged in'}</h1>;
}

export default ProfilePage;
