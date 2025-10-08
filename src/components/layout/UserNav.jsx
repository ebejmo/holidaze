export default function UserNav({ onLogout }) {
  return (
    <div className="mt-2 mt-md-0">
      <button
        className="btn btn-outline-secondary w-100 w-md-auto"
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  );
}
