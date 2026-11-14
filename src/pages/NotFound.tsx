import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="layout-shell flex min-h-[70svh] flex-col items-center justify-center text-center">
      <p className="font-mono text-xs text-[var(--accent)]">404 // ROUTE NOT FOUND</p>
      <h1 className="font-display mt-4 text-5xl sm:text-7xl">This page took a wrong turn.</h1>
      <p className="mt-4 max-w-xl leading-7 text-[var(--muted-ink)]">The route does not exist in this portfolio archive.</p>
      <Link to="/" className="ink-btn-primary mt-7 px-5">Return home</Link>
    </div>
  );
};

export default NotFound;
