import { useState, useCallback, useMemo } from 'react';
import { Modal } from '../../components/ui/Modal';
import { ModalContext } from './ModalContext';

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
