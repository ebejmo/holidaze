import { useEffect } from 'react';
import { useModal } from '../../context/modal/useModal';

export default function CreateVenueModal() {
  const { setTitle } = useModal();

  useEffect(() => {
    setTitle('Create Venue');
  }, [setTitle]);

  return (
    <div className="p-3">
      <p className="text-center">Add a new venue</p>

      <div className="text-center">
        <p className="text-muted small">Form coming here</p>
      </div>
    </div>
  );
}
