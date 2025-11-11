import { useState, useCallback, useMemo } from 'react';
import { ToastContext } from './ToastContext';
import { ToastContainer } from './ToastContainer';
import { DEFAULT_VARIANT, TOAST_DURATION } from './toastConfig';

/**
 * Provides global toast notifications throughout the application.
 *
 * Manages adding, removing, and timing of toasts via React Context.
 * Renders a shared <ToastContainer /> that displays active notifications.
 *
 * @component
 * @param {Object} props - React props.
 * @param {React.ReactNode} props.children - Child components that can trigger toast notifications.
 * @returns {JSX.Element} Context provider wrapping the app with toast functionality.
 *
 * @example
 * // Example: wrapping the app in the provider
 * import { ToastProvider } from './context/toast/ToastProvider';
 *
 * function App() {
 *   return (
 *     <ToastProvider>
 *       <AppRoutes />
 *     </ToastProvider>
 *   );
 * }
 *
 * @context
 * Provides the following actions:
 * - `addToast(message, variant?)` {Function} Displays a toast message with an optional Bootstrap variant (e.g. 'success', 'danger').
 * - `removeToast(id)` {Function} Removes a toast manually by its ID.
 *
 * @state
 * Internal state includes:
 * - `toasts` {Array<{id: number, message: string, variant: string}>} - Active toast messages.
 *
 * @config
 * - `DEFAULT_VARIANT` - Default Bootstrap variant for toasts.
 * - `TOAST_DURATION` - Duration (ms) before each toast auto-dismisses.
 */
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
