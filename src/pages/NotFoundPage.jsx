import EmptyState from '../components/ui/EmptyState';

export default function NotFoundPage() {
  return (
    <>
      <EmptyState
        icon="warning"
        title="Page not found"
        body="The page you're looking for doesn't exist."
        cta={{ label: 'Go Home', to: '/' }}
        variant="fullpage"
      />
    </>
  );
}
