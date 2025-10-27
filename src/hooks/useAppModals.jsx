import { useModal } from '../context/modal/useModal';
import { AuthModal, CreateVenueModal } from '../components/modal';
// add imports avatar modal create venue modal etc here

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

  return {
    openAuthModal,
    openCreateVenueModal,
    closeModal,
  };
}
