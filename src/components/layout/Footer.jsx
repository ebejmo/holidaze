export default function Footer() {
  return (
    // skeleton -> improve styles and functionality later
    <footer className="bg-light text-center text-muted py-3 mt-auto border-top">
      <div className="container">
        <small>
          © {new Date().getFullYear()} Holidaze. All rights reserved.
        </small>
      </div>
    </footer>
  );
}
