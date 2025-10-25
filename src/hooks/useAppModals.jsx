import { useModal } from '../context/modal/useModal';
import { AuthModal, CreateVenueModal } from '../components/modal';
// add imports avatar modal create venue modal etc here

export function useAppModals() {
  const { openModal, closeModal } = useModal();

  function openAuthModal(mode = 'login') {
    openModal(<AuthModal initialMode={mode} />, {});
  }

  function openCreateVenueModal() {
    openModal(<CreateVenueModal />, {
      title: 'create venue',
      size: 'lg',
    });
  }

  return {
    openAuthModal,
    openCreateVenueModal,
    closeModal,
  };
}
