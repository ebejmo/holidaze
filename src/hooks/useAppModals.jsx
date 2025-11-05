import { useModal } from '../context/modal/useModal';
import { AuthModal, CreateVenueModal } from '../components/modal';
import UpdateAvatarModal from '../components/modal/UpdateAvatarModal';

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

  return {
    openAuthModal,
    openCreateVenueModal,
    openUpdateAvatarModal,
    closeModal,
  };
}
