export function GuestNav({ onAuthClick }) {
  return (
    <div className="d-flex flex-column flex-md-row gap-3 mt-2 mt-md-0">
      <button className="btn btn-primary" onClick={() => onAuthClick('login')}>
        Log in
      </button>
      <button
        className="btn btn-outline-primary"
        onClick={() => onAuthClick('register')}
      >
        Register
      </button>
    </div>
  );
}
