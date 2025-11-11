import { useModal } from '../context/modal/useModal';
import {
  AuthModal,
  CreateVenueModal,
  UpdateVenueModal,
  UpdateAvatarModal,
} from '../components/modal';

/**
 * Custom hook that provides preconfigured modal actions for core app features.
 *
 * Wraps the generic `useModal` context and exposes helper functions to open
 * specific modals like authentication, venue creation, and profile updates.
 *
 * @function useAppModals
 * @returns {Object} Modal control functions.
 *
 * @property {Function} openAuthModal - Opens the Auth modal (login or register view).
 * @property {Function} openCreateVenueModal - Opens the Create Venue modal for managers.
 * @property {Function} openUpdateAvatarModal - Opens the Update Avatar modal.
 * @property {Function} openUpdateVenueModal - Opens the Update Venue modal for an existing venue.
 * @property {Function} closeModal - Closes the currently open modal.
 *
 * @example
 * // Example usage inside a component
 * import { useAppModals } from '../hooks/useAppModals';
 *
 * function NavbarActions() {
 *   const { openAuthModal, openCreateVenueModal } = useAppModals();
 *
 *   return (
 *     <>
 *       <button onClick={() => openAuthModal('login')}>Login</button>
 *       <button onClick={() => openCreateVenueModal(profile)}>New Venue</button>
 *     </>
 *   );
 * }
 */
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
