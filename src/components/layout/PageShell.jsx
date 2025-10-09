import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function PageShell() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
