import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './styles/index.scss';
import App from './App.jsx';
import { AuthProvider } from './context/auth/AuthProvider';
import { ToastProvider } from './context/toast/ToastProvider';
import { ModalProvider } from './context/modal/ModalProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
