import { Routes, Route } from 'react-router-dom';
import { HomePage, VenueDetailPage, ProfilePage, NotFoundPage } from './pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/venues/:id" element={<VenueDetailPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
