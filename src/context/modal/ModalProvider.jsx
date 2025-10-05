import { useState, useCallback, useMemo } from 'react';
import { Modal } from '../../components/ui/Modal';
import { ModalContext } from './ModalContext';

export function ModalProvider({ children }) {
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    content: null,
  });

  const openModal = useCallback((content, title = '') => {
    setModalState({ isOpen: true, title, content });
  });

  const closeModal = useCallback(() => {
    setModalState({ isOpen: false, title: '', content: null });
  }, []);

  const setTitle = useCallback((title) => {
    setModalState((prev) => (prev.title === title ? prev : { ...prev, title }));
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
      >
        {modalState.content}
      </Modal>
    </ModalContext.Provider>
  );
}
