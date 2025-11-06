import { useEffect } from 'react';
import { useModal } from '../../context/modal/useModal';
import UpdateVenueForm from '../forms/UpdateVenueForm';

export default function UpdateVenueModal({ venue }) {
  const { setTitle } = useModal();

  useEffect(() => {
    if (venue?.name) {
      setTitle(`Update ${venue.name}`);
    }
  }, [setTitle, venue?.name]);

  if (!venue) {
    return (
      <div className="p-4 text-center">
        <p className="text-muted small">No venue data found</p>
      </div>
    );
  }

  return (
    <div className="p-3">
      <p className="text-center text-muted small mb-3" aria-live="polite">
        Edit your venue details below
      </p>
      <UpdateVenueForm venue={venue} />
    </div>
  );
}
