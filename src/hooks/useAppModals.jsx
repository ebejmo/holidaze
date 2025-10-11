import { useModal } from '../context/modal/useModal';
import { AuthModal } from '../components/modal';
// add imports avatar modal create venue modal etc here

export function useAppModals() {
  const { openModal, closeModal } = useModal();

  function openAuthModal(mode = 'login') {
    openModal(<AuthModal initialMode={mode} />, {});
  }

  return {
    openAuthModal,
    closeModal,
  };
}
