import { useEffect } from 'react';
import { useModal } from '../../context/modal/useModal';
import CreateVenueForm from '../forms/CreateVenueForm';

export default function CreateVenueModal({ profile }) {
  const { setTitle } = useModal();

  useEffect(() => {
    setTitle('Create Venue');
  }, [setTitle]);

  if (!profile?.venueManager) {
    return (
      <div className="p-4 text-center">
        <p className="text-muted mb-0">You must be a host to create a venue</p>
      </div>
    );
  }

  return (
    <div className="p-3">
      <p className="text-center small text-muted mb-3" aria-live="polite">
        Create a new venue
      </p>

      <CreateVenueForm profile={profile} />
    </div>
  );
}
