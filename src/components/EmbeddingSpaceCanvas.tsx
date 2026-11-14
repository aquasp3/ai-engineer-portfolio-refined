import { useEffect, useRef } from "react";

const EmbeddingSpaceCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = Array.from({ length: 28 }, (_, index) => ({ x: (index * 83) % 900, y: (index * 137) % 600 }));
    let pointer = { x: -1000, y: -1000 };
    let frame = 0;
    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const draw = () => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      context.strokeStyle = "color-mix(in srgb, var(--ink) 8%, transparent)";
      context.lineWidth = 1;
      for (let x = 20; x < window.innerWidth; x += 80) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, window.innerHeight);
        context.stroke();
      }
      for (let y = 20; y < window.innerHeight; y += 80) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(window.innerWidth, y);
        context.stroke();
      }
      const nearest = nodes.map((node) => ({ ...node, distance: Math.hypot(node.x - pointer.x, node.y - pointer.y) })).sort((a, b) => a.distance - b.distance).slice(0, 4);
      nearest.forEach((node) => { if (node.distance < 150) { context.strokeStyle = "rgba(225,45,38,.22)"; context.beginPath(); context.moveTo(pointer.x, pointer.y); context.lineTo(node.x, node.y); context.stroke(); } });
      nodes.forEach((node) => { context.fillStyle = "rgba(24,24,24,.16)"; context.beginPath(); context.arc(node.x, node.y, 2, 0, Math.PI * 2); context.fill(); });
      if (!reduced && !document.hidden) frame = requestAnimationFrame(draw);
    };
    const move = (event: MouseEvent) => { pointer = { x: event.clientX, y: event.clientY }; };
    resize(); draw();
    window.addEventListener("resize", resize); window.addEventListener("mousemove", move);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); window.removeEventListener("mousemove", move); };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 opacity-30 dark:opacity-20" />;
};

export default EmbeddingSpaceCanvas;
