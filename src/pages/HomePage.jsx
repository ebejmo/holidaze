import EmptyState from '../components/ui/EmptyState';
import Icon from '../components/ui/Icon';
import Spinner from '../components/ui/Spinner';
import { useToast } from '../context/toast/useToast';

export default function HomePage() {
  const { addToast } = useToast();

  return (
    <div>
      <h1>Home Page</h1>
      <div className="container">
        <Spinner centered size="sm" color="info" />

        <button
          className="btn btn-primary"
          onClick={() => addToast('Venue created', 'success')}
        >
          Primary
        </button>
        <Icon name="calendar" />
        <EmptyState
          icon="search"
          title="no result found"
          body={'We could not find and venues matching'}
          variant="inline"
        />
      </div>
    </div>
  );
}
