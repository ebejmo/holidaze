import { useToast } from '../context/toast/useToast';

export default function HomePage() {
  const { addToast } = useToast();

  return (
    <div>
      <h1>Home Page</h1>
      <div className="container">
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
