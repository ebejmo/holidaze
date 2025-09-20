import { Routes, Route } from 'react-router-dom';
import PageShell from './components/layout/PageShell';
import { HomePage, VenueDetailPage, ProfilePage, NotFoundPage } from './pages';

function App() {
  return (
    <Routes>
      <Route element={<PageShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/venues/:id" element={<VenueDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
