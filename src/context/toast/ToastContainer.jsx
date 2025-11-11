import { Toast } from './Toast';

export function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      {toasts.map(({ id, message, variant }) => (
        <Toast
          key={id}
          message={message}
          variant={variant}
          onDismiss={() => removeToast(id)}
        />
      ))}
    </div>
  );
}
