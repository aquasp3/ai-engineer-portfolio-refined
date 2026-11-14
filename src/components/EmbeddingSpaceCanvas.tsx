import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

type NodePoint = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  accent: boolean;
  label?: string;
};

type Packet = {
  from: number;
  to: number;
  progress: number;
  speed: number;
  color: string;
};

type BotState = "idle" | "listening" | "thinking" | "routing" | "happy" | "confused" | "sleepy";

const tags = ["RAG", "NLP", "LangGraph", "FastAPI", "Embeddings", "PyTorch", "Ollama"];

const color = (name: string, fallback: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;

const EmbeddingSpaceCanvas = () => {
  const { pathname } = useLocation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const routeHome = pathname === "/";
  const lowEnd = typeof navigator !== "undefined" && (navigator.hardwareConcurrency || 8) <= 4;

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let ink = color("--ink", "#181818");
    let accent = color("--accent", "#E12D26");
    let botState: BotState = "idle";

    const viewport = { width: 0, height: 0, dpr: 1 };
    const pointer = { x: -9999, y: -9999, active: false };
    const visible = { value: true };
    let frame = 0;
    let lastTime = 0;
    let mounted = true;

    const count = Math.max(
      18,
      Math.round((window.innerWidth < 640 ? 28 : 56) * (routeHome ? 1 : 0.65) * (lowEnd ? 0.6 : 1))
    );

    const nodes: NodePoint[] = [];
    const packets: Packet[] = [];

    const syncThemeColors = () => {
      ink = color("--ink", "#181818");
      accent = color("--accent", "#E12D26");
    };

    const initNodes = () => {
      nodes.length = 0;
      packets.length = 0;
      for (let i = 0; i < count; i += 1) {
        const isTagged = routeHome && i < tags.length;
        nodes.push({
          x: Math.random() * viewport.width,
          y: Math.random() * viewport.height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: isTagged ? 3.5 : 1.8 + Math.random() * 1.4,
          accent: isTagged || Math.random() < 0.22,
          label: isTagged ? tags[i] : undefined,
        });
      }
    };

    const resize = () => {
      viewport.width = window.innerWidth;
      viewport.height = window.innerHeight;
      viewport.dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(viewport.width * viewport.dpr);
      canvas.height = Math.floor(viewport.height * viewport.dpr);
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;
      ctx.setTransform(viewport.dpr, 0, 0, viewport.dpr, 0, 0);
      if (nodes.length === 0) initNodes();
      draw(0);
    };

    function draw(delta: number) {
      ctx.clearRect(0, 0, viewport.width, viewport.height);

      const isBusy = botState === "thinking" || botState === "routing";
      const isListeningOrHappy = botState === "listening" || botState === "happy";
      const isSleepy = botState === "sleepy";

      const speedMult = reduced ? 0 : isBusy ? 3.2 : isListeningOrHappy ? 1.8 : isSleepy ? 0.3 : 1;
      const activeAccent = isListeningOrHappy ? "#22C55E" : accent;
      const linkDist = viewport.width < 640 ? 115 : isBusy ? 185 : 150;

      // Update node positions
      for (const node of nodes) {
        node.x += node.vx * (delta / 16) * speedMult;
        node.y += node.vy * (delta / 16) * speedMult;

        if (node.x < 0) { node.x = 0; node.vx *= -1; }
        if (node.x > viewport.width) { node.x = viewport.width; node.vx *= -1; }
        if (node.y < 0) { node.y = 0; node.vy *= -1; }
        if (node.y > viewport.height) { node.y = viewport.height; node.vy *= -1; }
      }

      // Draw neural connections between nearby nodes
      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);

          if (dist < linkDist) {
            const strength = 1 - dist / linkDist;
            const isHighlighted = a.accent || b.accent;
            ctx.globalAlpha = strength * (isSleepy ? 0.14 : isBusy ? 0.55 : 0.32);
            ctx.strokeStyle = isHighlighted ? activeAccent : ink;
            ctx.lineWidth = isHighlighted ? 1.35 : 0.9;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();

            // Spawn neural signal pulse packets along active links
            if (
              !reduced &&
              !isSleepy &&
              isHighlighted &&
              packets.length < (isBusy ? 24 : 10) &&
              Math.random() < (isBusy ? 0.018 : 0.004)
            ) {
              packets.push({
                from: i,
                to: j,
                progress: 0,
                speed: isBusy ? 0.035 : 0.016,
                color: activeAccent,
              });
            }
          }
        }

        // Connect nodes to user cursor
        if (pointer.active) {
          const pdx = a.x - pointer.x;
          const pdy = a.y - pointer.y;
          const pdist = Math.hypot(pdx, pdy);
          if (pdist < 170) {
            ctx.globalAlpha = (1 - pdist / 170) * 0.55;
            ctx.strokeStyle = activeAccent;
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.stroke();
          }
        }
      }

      // Update & draw traveling neural signal packets
      for (let i = packets.length - 1; i >= 0; i -= 1) {
        const pkt = packets[i];
        pkt.progress += pkt.speed * (delta / 16);
        if (pkt.progress >= 1) {
          packets.splice(i, 1);
          continue;
        }
        const from = nodes[pkt.from];
        const to = nodes[pkt.to];
        if (!from || !to) continue;
        const px = from.x + (to.x - from.x) * pkt.progress;
        const py = from.y + (to.y - from.y) * pkt.progress;

        ctx.globalAlpha = 0.9;
        ctx.fillStyle = pkt.color;
        ctx.beginPath();
        ctx.arc(px, py, isBusy ? 3 : 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw nodes & subtle AI embedding labels
      ctx.font = "500 10px 'DM Mono', monospace";
      for (const node of nodes) {
        ctx.globalAlpha = isSleepy ? 0.35 : node.accent ? 0.85 : 0.55;
        ctx.fillStyle = node.accent ? activeAccent : ink;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        if (node.label) {
          ctx.globalAlpha = isSleepy ? 0.25 : isBusy ? 0.75 : 0.45;
          ctx.fillStyle = ink;
          ctx.fillText(node.label, node.x + 7, node.y + 3);
        }
      }

      ctx.globalAlpha = 1;
    }

    const tick = (time: number) => {
      frame = 0;
      if (!mounted || !visible.value || document.hidden) return;
      draw(Math.min(32, lastTime ? time - lastTime : 16));
      lastTime = time;
      frame = requestAnimationFrame(tick);
    };

    const resume = () => {
      if (!reduced && !frame && visible.value && !document.hidden) frame = requestAnimationFrame(tick);
    };

    const pointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };

    const pointerLeave = () => {
      pointer.active = false;
    };

    const onBotState = (event: Event) => {
      const detail = (event as CustomEvent<BotState>).detail;
      if (detail) botState = detail;
    };

    const themeObserver = new MutationObserver(syncThemeColors);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            ([entry]) => {
              visible.value = entry.isIntersecting;
              resume();
            },
            { threshold: 0 }
          )
        : null;

    observer?.observe(wrapper);
    window.addEventListener("resize", resize);
    window.addEventListener("ai-bot-state", onBotState);
    document.addEventListener("visibilitychange", resume);
    if (!reduced) {
      window.addEventListener("pointermove", pointerMove, { passive: true });
      window.addEventListener("pointerleave", pointerLeave, { passive: true });
    }

    resize();
    if (reduced) draw(0);
    else resume();

    return () => {
      mounted = false;
      if (frame) cancelAnimationFrame(frame);
      themeObserver.disconnect();
      observer?.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("ai-bot-state", onBotState);
      document.removeEventListener("visibilitychange", resume);
      window.removeEventListener("pointermove", pointerMove);
      window.removeEventListener("pointerleave", pointerLeave);
    };
  }, [lowEnd, pathname, reduced, routeHome]);

  return (
    <div ref={wrapperRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <canvas ref={canvasRef} className="absolute inset-0 opacity-75 dark:opacity-65" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_55%,var(--page-bg)_92%)] opacity-55" />
    </div>
  );
};

export default EmbeddingSpaceCanvas;
