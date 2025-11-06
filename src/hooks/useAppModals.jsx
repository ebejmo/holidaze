import { useModal } from '../context/modal/useModal';
import {
  AuthModal,
  CreateVenueModal,
  UpdateVenueModal,
  UpdateAvatarModal,
} from '../components/modal';

export function useAppModals() {
  const { openModal, closeModal } = useModal();

  function openAuthModal(mode = 'login') {
    openModal(<AuthModal initialMode={mode} />, {});
  }

  function openCreateVenueModal(profile) {
    openModal(<CreateVenueModal profile={profile} />, {
      title: 'Create venue',
      size: 'md',
    });
  }

  function openUpdateAvatarModal() {
    openModal(<UpdateAvatarModal />, {});
  }

  function openUpdateVenueModal(venue) {
    openModal(<UpdateVenueModal venue={venue} />, {
      title: `Update ${venue.name}`,
      size: 'md',
    });
  }

  return {
    openAuthModal,
    openCreateVenueModal,
    openUpdateAvatarModal,
    openUpdateVenueModal,
    closeModal,
  };
}
