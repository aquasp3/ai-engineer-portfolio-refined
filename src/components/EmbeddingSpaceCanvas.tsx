import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

type Streak = { angle: number; progress: number; speed: number; length: number; red: boolean };
type Rocket = { progress: number; speed: number; lane: number; spin: number; hit: boolean } | null;
type BotState = "idle" | "listening" | "thinking" | "routing" | "happy" | "confused" | "sleepy";

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
const color = (name: string, fallback: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;

const EmbeddingSpaceCanvas = () => {
  const { pathname } = useLocation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const rocketRef = useRef<Rocket>(null);
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const routeHome = pathname === "/";
  const lowEnd = typeof navigator !== "undefined" && (navigator.hardwareConcurrency || 8) <= 4;

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let ink = color("--ink", "#181818");
    let accent = color("--accent", "#E12D26");
    let botState: BotState = "idle";

    const streaks: Streak[] = [];
    const viewport = { width: 0, height: 0, dpr: 1 };
    const vanishing = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const visible = { value: true };
    let frame = 0;
    let lastTime = 0;
    let boostUntil = 0;
    let rocketTimer = 0;
    let mounted = true;

    const count = Math.max(
      12,
      Math.round((window.innerWidth < 640 ? 50 : 120) * (routeHome ? 1 : 0.5) * (lowEnd ? 0.5 : 1))
    );
    const resetStreak = (streak: Streak, initial = false) => {
      streak.angle = Math.random() * Math.PI * 2;
      streak.progress = initial ? Math.random() * 0.95 : 0.02;
      streak.speed = 0.000035 + Math.random() * 0.000035;
      streak.length = 0.4 + Math.random() * 0.8;
      streak.red = Math.random() < 0.14;
    };
    for (let index = 0; index < count; index += 1) {
      const streak = { angle: 0, progress: 0, speed: 0, length: 0, red: false };
      resetStreak(streak, true);
      streaks.push(streak);
    }

    const syncThemeColors = () => {
      ink = color("--ink", "#181818");
      accent = color("--accent", "#E12D26");
    };

    const resize = () => {
      viewport.width = window.innerWidth;
      viewport.height = window.innerHeight;
      viewport.dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(viewport.width * viewport.dpr);
      canvas.height = Math.floor(viewport.height * viewport.dpr);
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;
      context.setTransform(viewport.dpr, 0, 0, viewport.dpr, 0, 0);
      vanishing.x = vanishing.targetX = viewport.width * 0.68;
      vanishing.y = vanishing.targetY = viewport.height * 0.5;
      draw(0);
    };

    const point = (angle: number, distance: number) => ({
      x: vanishing.x + Math.cos(angle) * viewport.width * distance,
      y: vanishing.y + Math.sin(angle) * viewport.height * distance,
    });

    const rocketPoint = (progress: number, lane: number) => {
      const startX = viewport.width * 0.05;
      const endX = viewport.width * 0.55;
      const x = startX + (endX - startX) * progress;
      const y =
        viewport.height * lane + Math.sin(progress * Math.PI) * viewport.height * (lane < 0.5 ? 0.1 : -0.1);
      const nextX = startX + (endX - startX) * Math.min(progress + 0.01, 1);
      const nextY =
        viewport.height * lane +
        Math.sin(Math.min(progress + 0.01, 1) * Math.PI) * viewport.height * (lane < 0.5 ? 0.1 : -0.1);
      return { x, y, angle: Math.atan2(nextY - y, nextX - x) };
    };

    const drawRocket = (activeAccent: string) => {
      const rocket = rocketRef.current;
      if (!rocket) return;
      const position = rocketPoint(rocket.progress, rocket.lane);
      const trail = Math.max(0, rocket.progress - 0.12);
      const trailPoint = rocketPoint(trail, rocket.lane);
      context.save();
      context.globalAlpha = 0.22;
      context.strokeStyle = activeAccent;
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(trailPoint.x, trailPoint.y);
      context.lineTo(position.x, position.y);
      context.stroke();
      context.translate(position.x, position.y);
      context.rotate(position.angle + rocket.spin);
      context.globalAlpha = 1;
      context.lineWidth = 3;
      context.strokeStyle = ink;
      context.fillStyle = activeAccent;
      context.beginPath();
      context.moveTo(18, 0);
      context.quadraticCurveTo(4, -10, -15, -7);
      context.lineTo(-18, 7);
      context.quadraticCurveTo(4, 10, 18, 0);
      context.fill();
      context.stroke();
      context.fillStyle = color("--page-bg", "#F4F2EC");
      context.beginPath();
      context.arc(-3, 0, 3.5, 0, Math.PI * 2);
      context.fill();
      context.stroke();
      context.strokeStyle = activeAccent;
      context.beginPath();
      context.moveTo(-17, -4);
      context.lineTo(-27 - Math.random() * 8, 0);
      context.lineTo(-17, 4);
      context.stroke();
      context.restore();
    };

    function draw(delta: number) {
      context.clearRect(0, 0, viewport.width, viewport.height);

      const isBusy = botState === "thinking" || botState === "routing";
      const isListeningOrHappy = botState === "listening" || botState === "happy";
      const isSleepy = botState === "sleepy";

      const stateMultiplier = isBusy ? 3.2 : isListeningOrHappy ? 1.75 : isSleepy ? 0.35 : 1;
      const clickBoost = boostUntil > performance.now() ? ((boostUntil - performance.now()) / 600) * 2.2 : 0;
      const speedBoost = reduced ? 1 : stateMultiplier + clickBoost;

      const activeAccent = isListeningOrHappy ? "#22C55E" : accent;

      vanishing.x += (vanishing.targetX - vanishing.x) * 0.035;
      vanishing.y += (vanishing.targetY - vanishing.y) * 0.035;

      for (const streak of streaks) {
        streak.progress += streak.speed * delta * speedBoost;
        if (streak.progress > 1.2) resetStreak(streak);
        const end = point(streak.angle, streak.progress);
        const start = point(streak.angle, Math.max(0.01, streak.progress - streak.length * (isBusy ? 0.09 : 0.06)));
        context.globalAlpha = (isSleepy ? 0.08 : isBusy ? 0.26 : 0.15) + streak.progress * 0.22;
        context.strokeStyle = streak.red ? activeAccent : ink;
        context.lineWidth = streak.red ? (isBusy ? 2.5 : 2) : 1;
        context.beginPath();
        context.moveTo(start.x, start.y);
        context.lineTo(end.x, end.y);
        context.stroke();
      }
      context.globalAlpha = 1;
      if (rocketRef.current) {
        rocketRef.current.progress += delta * rocketRef.current.speed * speedBoost;
        if (rocketRef.current.progress >= 1) rocketRef.current = null;
        else drawRocket(activeAccent);
      }
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
      vanishing.targetX = clamp(event.clientX, viewport.width * 0.45, viewport.width * 0.9);
      vanishing.targetY = clamp(event.clientY, viewport.height * 0.15, viewport.height * 0.85);
    };

    const pointerDown = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest("[data-warp-boost], .ink-btn-primary")) boostUntil = performance.now() + 600;
      const rocket = rocketRef.current;
      if (!rocket) return;
      const position = rocketPoint(rocket.progress, rocket.lane);
      if (Math.hypot(event.clientX - position.x, event.clientY - position.y) < 30) {
        rocket.hit = true;
        rocket.speed = 0.0005;
        rocket.spin += Math.PI * 2;
      }
    };

    const onBotState = (event: Event) => {
      const detail = (event as CustomEvent<BotState>).detail;
      if (!detail) return;
      botState = detail;
      if (detail === "routing" || detail === "thinking") {
        boostUntil = performance.now() + 500;
      }
    };

    const spawnRocket = () => {
      if (routeHome && !lowEnd && !reduced && !rocketRef.current) {
        rocketRef.current = {
          progress: 0,
          speed: 0.00012,
          lane: Math.random() > 0.5 ? 0.18 : 0.82,
          spin: 0,
          hit: false,
        };
      }
      rocketTimer = window.setTimeout(spawnRocket, 8000 + Math.random() * 4000);
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
      window.addEventListener("pointerdown", pointerDown, { passive: true });
      if (routeHome && !lowEnd) rocketTimer = window.setTimeout(spawnRocket, 8000 + Math.random() * 4000);
    }
    resize();
    if (reduced) draw(0);
    else resume();

    return () => {
      mounted = false;
      if (frame) cancelAnimationFrame(frame);
      window.clearTimeout(rocketTimer);
      themeObserver.disconnect();
      observer?.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("ai-bot-state", onBotState);
      document.removeEventListener("visibilitychange", resume);
      window.removeEventListener("pointermove", pointerMove);
      window.removeEventListener("pointerdown", pointerDown);
    };
  }, [lowEnd, pathname, reduced, routeHome]);

  return (
    <div ref={wrapperRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <canvas ref={canvasRef} className="absolute inset-0 opacity-35 dark:opacity-25" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_38%,var(--page-bg)_78%)] opacity-70" />
    </div>
  );
};

export default EmbeddingSpaceCanvas;
