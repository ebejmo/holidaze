import { useEffect } from 'react';
import { useModal } from '../../context/modal/useModal';
import UpdateAvatarForm from '../forms/UpdateAvatarForm';

export default function UpdateAvatarModal() {
  const { setTitle } = useModal();

  useEffect(() => {
    setTitle('Edit Profile');
  }, [setTitle]);

  return (
    <div className="p-3">
      <p className="text-center small text-muted mb-3" aria-live="polite">
        Update your profile picture URL
      </p>

      <UpdateAvatarForm />
    </div>
  );
}
