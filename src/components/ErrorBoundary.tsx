import { Component, type ErrorInfo, type ReactNode } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error("Portfolio render error", error, info); }
  render() {
    if (this.state.hasError) return <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-5 text-center"><p className="font-mono text-xs text-[var(--accent)]">SYSTEM / RECOVERY</p><h1 className="font-display mt-4 text-5xl">Something needs a reset.</h1><p className="mt-4 text-[var(--muted-ink)]">The page could not render. Return home and try again.</p><Link to="/" className="ink-btn-primary mt-7 px-5">Return home</Link></main>;
    return this.props.children;
  }
}

export default ErrorBoundary;
