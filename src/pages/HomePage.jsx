import Spinner from '../components/ui/Spinner';
import { useToast } from '../context/toast/useToast';

export default function HomePage() {
  const { addToast } = useToast();

  return (
    <div>
      <h1>Home Page</h1>
      <div className="container">
        <Spinner centered size="sm" color="info" />
        <Spinner centered />
        <button className="btn btn-primary" disabled>
          <Spinner size="sm" color="light" /> Loading...
        </button>
        <button
          className="btn btn-primary"
          onClick={() => addToast('Venue created', 'success')}
        >
          Primary
        </button>

        <button
          className="btn btn-outline-secondary"
          onClick={() => addToast('Venue created', 'success')}
        >
          Secondary
        </button>

        <button
          className="btn btn-danger"
          onClick={() => addToast('Venue created', 'success')}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
