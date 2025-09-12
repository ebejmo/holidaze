import { useToast } from '../context/toast/useToast';

export default function HomePage() {
  const { addToast } = useToast();

  return (
    <div>
      <h1>Home Page</h1>
      <div className="container">
        <button
          className="btn btn-success"
          onClick={() => addToast('Venue created', 'success')}
        >
          ShowToast
        </button>
      </div>
    </div>
  );
}
