import { useState, useCallback, useMemo } from 'react';
import { Modal } from '../../components/ui/Modal';
import { ModalContext } from './ModalContext';

/**
 * Provides a global modal context and handles rendering of modal content across the app.
 *
 * Controls opening, closing, and updating modal titles dynamically.
 * Wraps the root application so any component can open a modal via context actions.
 *
 * @component
 * @param {Object} props - React props.
 * @param {React.ReactNode} props.children - Child components that can trigger modals.
 * @returns {JSX.Element} Context provider rendering both children and the shared <Modal /> component.
 *
 * @example
 * // Example: wrapping the app in the provider
 * import { ModalProvider } from './context/modal/ModalProvider';
 *
 * function App() {
 *   return (
 *     <ModalProvider>
 *       <AppRoutes />
 *     </ModalProvider>
 *   );
 * }
 *
 * @context
 * Provides the following actions:
 * - `openModal(content, options?)` {Function} Opens a modal with given content and optional settings.
 *   - @param {React.ReactNode} content - The modal content to display.
 *   - @param {Object} [options] - Optional settings.
 *   - @param {string} [options.title=''] - Title text for the modal header.
 *   - @param {'sm'|'md'|'lg'} [options.size='md'] - Size variant for the modal.
 *
 * - `closeModal()` {Function} Closes the currently open modal.
 * - `setTitle(title)` {Function} Dynamically updates the modal title while it’s open.
 *
 * @state
 * Internal state includes:
 * - `isOpen` {boolean} - Whether the modal is currently open.
 * - `title` {string} - The current modal title.
 * - `content` {React.ReactNode|null} - The component or content displayed in the modal.
 * - `size` {'sm'|'md'|'lg'} - The modal size.
 */
export function ModalProvider({ children }) {
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    content: null,
    size: 'md',
  });

  const openModal = useCallback((content, options = {}) => {
    const { title = '', size = 'md' } = options;
    setModalState({ isOpen: true, title, content, size });
  }, []);

  const closeModal = useCallback(() => {
    setModalState({ isOpen: false, title: '', content: null, size: 'md' });
  }, []);

  const setTitle = useCallback((title) => {
    setModalState((prev) => ({ ...prev, title }));
  }, []);

  const context = useMemo(
    () => ({ openModal, closeModal, setTitle }),
    [openModal, closeModal, setTitle]
  );

  return (
    <ModalContext.Provider value={context}>
      {children}
      <Modal
        show={modalState.isOpen}
        onClose={closeModal}
        title={modalState.title}
        size={modalState.size}
      >
        {modalState.content}
      </Modal>
    </ModalContext.Provider>
  );
}
