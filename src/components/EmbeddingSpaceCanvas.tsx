import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const EmbeddingScene = lazy(() => import("./EmbeddingScene"));

const FallbackSpace = () => <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 opacity-30 dark:opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 30%), radial-gradient(circle at 80% 60%, color-mix(in srgb, var(--ink) 8%, transparent), transparent 32%)" }} />;

const EmbeddingSpaceCanvas = () => {
  const { pathname } = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [fallback, setFallback] = useState(false);
  const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lowEnd = typeof navigator !== "undefined" && (navigator.hardwareConcurrency || 8) <= 4;

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting && !document.hidden), { threshold: 0 });
    const handleVisibility = () => setVisible(!document.hidden);
    observer.observe(node);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", handleVisibility); };
  }, []);

  useEffect(() => {
    try {
      const probe = document.createElement("canvas");
      if (!probe.getContext("webgl") && !probe.getContext("experimental-webgl")) setFallback(true);
    } catch { setFallback(true); }
  }, []);

  if (fallback || lowEnd) return <FallbackSpace />;
  return <div ref={containerRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 opacity-30 dark:opacity-20">
    <Suspense fallback={<FallbackSpace />}>
      {visible && <EmbeddingScene route={pathname} reducedMotion={reducedMotion} onError={() => setFallback(true)} />}
    </Suspense>
    <div className="absolute inset-0 flex items-center justify-center gap-8 font-mono text-[10px] text-[var(--muted-ink)] opacity-60 sm:gap-16">
      {["RAG", "NLP", "LangGraph", "FastAPI", "ChromaDB", "Ollama", "Scikit-Learn"].map((label) => <span key={label}>{label}</span>)}
    </div>
  </div>;
};

export default EmbeddingSpaceCanvas;
