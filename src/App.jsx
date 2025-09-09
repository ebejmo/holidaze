function App() {
  return (
    <div className="container py-5">
      <h1 className="mb-4">Holidaze Style Test</h1>
      <p className="text-muted">
        This is a body paragraph using <strong>Source Sans 3</strong>.
      </p>
      <div className="alert alert-primary mt-3">Alert Primary</div>
      <button className="btn btn-primary me-2">Primary Button</button>
      <button className="btn btn-secondary">Secondary Button</button>
      <hr className="my-4" />
      <div className="card" style={{ maxWidth: '18rem' }}>
        <div className="card-body">
          <h5 className="card-title">Card Title</h5>
          <p className="card-text">
            A simple card to confirm Bootstrap and theme colors are working.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
