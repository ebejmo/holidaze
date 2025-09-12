import { useState, useCallback, useMemo } from 'react';
import { ToastContext } from './ToastContext';
import { ToastContainer } from './ToastContainer';
import { DEFAULT_VARIANT, TOAST_DURATION } from './toastConfig';

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (message, variant = DEFAULT_VARIANT) => {
      const id = Date.now();
      const newToast = { id, message, variant };

      setToasts((prev) => [...prev, newToast]);

      setTimeout(() => removeToast(id), TOAST_DURATION);
    },
    [removeToast]
  );

  const contextValue = useMemo(
    () => ({ addToast, removeToast }),
    [addToast, removeToast]
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}
