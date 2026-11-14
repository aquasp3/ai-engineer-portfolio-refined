import { useEffect, useRef, useState, type ReactNode } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { contact } from "@/data/portfolio";
import { parseCommand } from "@/lib/cliCommands";
import { intentTargetPath, matchIntent } from "@/lib/intents";

type CharacterState = "idle" | "listening" | "thinking" | "routing" | "happy" | "confused" | "sleepy";
type TerminalLine = { id: number; content: string | ReactNode; tone?: "normal" | "error" | "accent" };
const commands = ["help", "ls", "cd", "open", "projects", "experience", "skills", "blogs", "resume", "contact", "whoami", "clear"];
const pagePaths = { projects: "/projects", experience: "/experience", skills: "/skills", blogs: "/blogs", contact: "/contact" };

const DeveloperCharacter = ({ state }: { state: CharacterState }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const eyesRef = useRef<SVGGElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const visible = useRef(true);
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [blink, setBlink] = useState(false);
  const [manualJump, setManualJump] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;
    const move = (event: MouseEvent) => {
      target.current.x = Math.max(-12, Math.min(12, ((event.clientX / window.innerWidth) - 0.5) * 24));
      target.current.y = Math.max(-8, Math.min(8, ((event.clientY / window.innerHeight) - 0.5) * -16));
    };
    const recenter = () => { target.current = { x: 0, y: 0 }; };
    const observer = "IntersectionObserver" in window
      ? new IntersectionObserver(([entry]) => { visible.current = entry.isIntersecting; }, { threshold: 0 })
      : null;
    let frame = 0;
    const animate = () => {
      if (visible.current && !document.hidden) {
        current.current.x += (target.current.x - current.current.x) * 0.12;
        current.current.y += (target.current.y - current.current.y) * 0.12;
        root.style.transform = `perspective(700px) rotateX(${current.current.y}deg) rotateY(${current.current.x}deg)`;
        const glanceX = state === "thinking" ? 2 : Math.max(-2, Math.min(2, current.current.x / 5));
        const glanceY = state === "thinking" ? -2 : Math.max(-2, Math.min(2, current.current.y / 4));
        eyesRef.current?.style.setProperty("transform", `translate3d(${glanceX}px, ${glanceY}px, 0)`);
      }
      frame = requestAnimationFrame(animate);
    };
    observer?.observe(root);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", recenter);
    frame = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(frame); observer?.disconnect(); window.removeEventListener("mousemove", move); window.removeEventListener("mouseleave", recenter); };
  }, [reduced, state]);

  useEffect(() => {
    if (reduced) return;
    const timer = window.setInterval(() => { setBlink(true); window.setTimeout(() => setBlink(false), 130); }, 3800);
    return () => window.clearInterval(timer);
  }, [reduced]);

  const triggerJump = () => {
    if (reduced || manualJump) return;
    setManualJump(true);
    window.setTimeout(() => setManualJump(false), 520);
  };

  const isTurbo = state === "thinking" || state === "routing";
  const isFast = isTurbo || state === "listening";
  const isSleepy = state === "sleepy";
  const isJumping = state === "happy" || manualJump;
  const beaconColor =
    state === "happy" || state === "listening"
      ? "#22C55E"
      : state === "sleepy"
        ? "#737373"
        : "#E12D26";

  const stepDuration = isTurbo ? "0.16s" : isFast ? "0.22s" : "0.32s";
  const worldDuration = isTurbo ? "1.1s" : isFast ? "1.6s" : "2.6s";

  return (
    <div
      ref={rootRef}
      onClick={triggerJump}
      onMouseEnter={triggerJump}
      aria-hidden="true"
      className="group order-2 relative mx-auto w-[65%] max-w-[230px] cursor-pointer select-none transition-transform duration-200 lg:order-1 lg:w-full lg:max-w-[280px]"
    >
      <style>{`
        @keyframes dinoHurdle {
          0%, 58%, 100% { transform: translateY(0px); }
          72% { transform: translateY(-34px); }
          84% { transform: translateY(-28px); }
        }
        @keyframes dinoManualJump {
          0%, 100% { transform: translateY(0px); }
          45% { transform: translateY(-38px); }
        }
        @keyframes dinoSprintBob {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        @keyframes dinoStumble {
          0%, 100% { transform: rotate(0deg) translateX(0px); }
          25% { transform: rotate(-6deg) translateX(-3px); }
          75% { transform: rotate(6deg) translateX(3px); }
        }
        @keyframes dinoStepA {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @keyframes dinoStepB {
          0%, 49% { opacity: 0; }
          50%, 100% { opacity: 1; }
        }
        @keyframes dinoGround {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 48; }
        }
        @keyframes dinoObstacle {
          0% { transform: translateX(170px); opacity: 0; }
          10% { opacity: 1; }
          88% { opacity: 1; }
          100% { transform: translateX(-110px); opacity: 0; }
        }
        @keyframes dinoCloud {
          0% { transform: translateX(140px); }
          100% { transform: translateX(-140px); }
        }
        @keyframes dinoBird {
          0% { transform: translate(160px, 0px); opacity: 0; }
          12% { opacity: 1; }
          50% { transform: translate(20px, -6px); }
          88% { opacity: 1; }
          100% { transform: translate(-120px, 2px); opacity: 0; }
        }
        @keyframes dinoTailWag {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        @keyframes dinoZzz {
          0% { opacity: 0; transform: translate(0, 4px); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: translate(10px, -16px); }
        }
        @keyframes speedStreak {
          0% { transform: translateX(20px); opacity: 0; }
          40% { opacity: 0.9; }
          100% { transform: translateX(-45px); opacity: 0; }
        }
      `}</style>

      <svg
        viewBox="0 0 260 220"
        shapeRendering="crispEdges"
        className="w-full overflow-hidden transition-transform duration-200 group-hover:scale-105"
      >
        {/* Drifting Pixel Clouds */}
        <g
          fill="var(--ink)"
          opacity="0.16"
          style={{ animation: reduced || isSleepy ? "none" : "dinoCloud 9s linear infinite" }}
        >
          <rect x="40" y="32" width="32" height="4" />
          <rect x="48" y="28" width="16" height="4" />
          <rect x="160" y="46" width="36" height="4" />
          <rect x="170" y="42" width="18" height="4" />
        </g>

        {/* Flying Pixel Pterodactyl */}
        {!isSleepy && (
          <g
            fill="var(--ink)"
            opacity="0.75"
            style={{ animation: reduced ? "none" : "dinoBird 5.4s linear 1.2s infinite" }}
          >
            {/* Bird Body & Beak */}
            <rect x="92" y="72" width="16" height="6" />
            <rect x="86" y="74" width="6" height="4" />
            <rect x="108" y="70" width="8" height="4" />
            {/* Flapping Wing Frame A */}
            <g style={{ animation: reduced ? "none" : "dinoStepA 0.35s infinite" }}>
              <rect x="96" y="62" width="6" height="10" />
              <rect x="98" y="58" width="4" height="4" />
            </g>
            {/* Flapping Wing Frame B */}
            <g style={{ animation: reduced ? "none" : "dinoStepB 0.35s infinite" }}>
              <rect x="96" y="78" width="6" height="8" />
              <rect x="98" y="86" width="4" height="4" />
            </g>
          </g>
        )}

        {/* Ground Horizon & Scrolling Pebbles */}
        <line x1="8" y1="176" x2="252" y2="176" stroke="var(--ink)" strokeWidth="3" />
        <line
          x1="12"
          y1="184"
          x2="248"
          y2="184"
          stroke="var(--ink)"
          strokeWidth="3"
          strokeDasharray="4 10 8 12"
          style={{
            animation: reduced || isSleepy ? "none" : `dinoGround ${isTurbo ? "0.22s" : isFast ? "0.35s" : "0.55s"} linear infinite`,
          }}
        />

        {/* Scrolling Pixel Cactus Hurdle */}
        {!isSleepy && (
          <g
            fill="var(--ink)"
            style={{
              animation: reduced ? "none" : `dinoObstacle ${worldDuration} linear infinite`,
            }}
          >
            {/* Center Stem */}
            <rect x="96" y="142" width="8" height="34" />
            <rect x="98" y="138" width="4" height="4" />
            {/* Left Arm */}
            <rect x="88" y="152" width="8" height="5" />
            <rect x="88" y="144" width="5" height="8" />
            {/* Right Arm */}
            <rect x="104" y="155" width="8" height="5" />
            <rect x="107" y="147" width="5" height="8" />
          </g>
        )}

        {/* Speed Streaks when Typing / Routing */}
        {isFast && !isSleepy && !reduced && (
          <g fill="#E12D26">
            <rect x="44" y="88" width="18" height="3" style={{ animation: "speedStreak 0.45s linear infinite" }} />
            <rect x="34" y="118" width="24" height="3" style={{ animation: "speedStreak 0.45s linear 0.15s infinite" }} />
            <rect x="48" y="146" width="16" height="3" style={{ animation: "speedStreak 0.45s linear 0.3s infinite" }} />
          </g>
        )}

        {/* Authentic Chrome T-Rex Runner */}
        <g
          style={{
            transformOrigin: "100px 140px",
            animation: reduced
              ? "none"
              : isSleepy
                ? "none"
                : state === "confused"
                  ? "dinoStumble 0.45s ease-in-out infinite"
                  : isJumping
                    ? "dinoManualJump 0.52s ease-out infinite"
                    : `dinoHurdle ${worldDuration} ease-in-out infinite`,
          }}
        >
          {/* Inner Sprint Bob */}
          <g
            style={{
              animation:
                reduced || isSleepy || isJumping
                  ? "none"
                  : `dinoSprintBob ${stepDuration} steps(2) infinite`,
            }}
          >
            {/* Head & Snout */}
            <path
              fill="var(--ink)"
              d="M104 52h44v4h4v24h-24v4h16v6h-28v6h-16V56h4v-4z"
            />

            {/* Open Roaring Jaw on Happy / Listening */}
            {(state === "happy" || state === "listening") && (
              <rect x="128" y="84" width="18" height="6" fill="var(--surface)" />
            )}

            {/* Eye Cutout */}
            <rect x="112" y="60" width="8" height="8" fill="var(--surface)" />

            {/* Eye Pupil / Blink / Sleep */}
            <g ref={eyesRef}>
              {isSleepy || blink ? (
                <rect x="112" y="64" width="8" height="2" fill="var(--ink)" />
              ) : state === "confused" ? (
                <rect x="114" y="62" width="4" height="4" fill="#E12D26" />
              ) : (
                <rect x="115" y="62" width="4" height="4" fill="var(--ink)" />
              )}
            </g>

            {/* Red Accent Scarf (flutters while running) */}
            <rect x="96" y="96" width="22" height="6" fill="#E12D26" />
            <g style={{ animation: reduced || isSleepy ? "none" : `dinoTailWag ${stepDuration} steps(2) infinite` }}>
              <rect x="86" y="100" width="12" height="6" fill="#E12D26" />
              <rect x="80" y="104" width="8" height="6" fill="#E12D26" />
            </g>

            {/* Neck, Torso & Stepped Tail */}
            <path
              fill="var(--ink)"
              d="M96 102h24v38H80v-6h-8v-6h-8v-6h-8v-18h6v8h6v6h8v4h14v-12h6v-8z"
            />

            {/* Animated T-Rex Arm */}
            <g style={{ animation: reduced || isSleepy ? "none" : `dinoTailWag ${stepDuration} steps(2) infinite` }}>
              <path fill="var(--ink)" d="M120 112h10v8h-4v-4h-6v-4z" />
            </g>

            {/* Running Legs (Alternating 2-Frame Pixel Cycle) */}
            {isSleepy ? (
              <>
                <path fill="var(--ink)" d="M84 140h12v28h6v6H84v-34z" />
                <path fill="var(--ink)" d="M104 140h12v28h6v6h-18v-34z" />
              </>
            ) : isJumping ? (
              <>
                {/* Mid-Air Tucked Legs */}
                <path fill="var(--ink)" d="M84 140h10v18h6v6H84v-24z" />
                <path fill="var(--ink)" d="M104 140h10v22h6v6h-16v-28z" />
              </>
            ) : (
              <>
                <g style={{ animation: reduced ? "none" : `dinoStepA ${stepDuration} infinite` }}>
                  <path fill="var(--ink)" d="M84 140h10v22h6v6H84v-28z" />
                  <path fill="var(--ink)" d="M104 140h10v32h6v4h-16v-36z" />
                </g>
                <g style={{ animation: reduced ? "none" : `dinoStepB ${stepDuration} infinite` }}>
                  <path fill="var(--ink)" d="M84 140h10v32h6v4H84v-36z" />
                  <path fill="var(--ink)" d="M104 140h10v20h6v6h-16v-26z" />
                </g>
              </>
            )}
          </g>
        </g>

        {/* Sleepy Zzz Particles */}
        {isSleepy && !reduced && (
          <g fill="var(--ink)" fontFamily="monospace" fontWeight="bold">
            <text x="156" y="56" fontSize="13" style={{ animation: "dinoZzz 2.2s ease-out infinite" }}>z</text>
            <text x="168" y="42" fontSize="16" style={{ animation: "dinoZzz 2.2s ease-out 0.7s infinite" }}>Z</text>
          </g>
        )}

        {/* Confused Question Mark */}
        {state === "confused" && (
          <text x="158" y="56" fill="#E12D26" fontFamily="monospace" fontWeight="bold" fontSize="20">
            ?
          </text>
        )}

        {/* Thinking / Routing Pixel Dots */}
        {isTurbo && !reduced && (
          <g fill="#E12D26">
            <rect x="160" y="52" width="5" height="5" className="animate-bounce" />
            <rect x="170" y="45" width="5" height="5" className="animate-bounce [animation-delay:120ms]" />
            <rect x="180" y="38" width="5" height="5" className="animate-bounce [animation-delay:240ms]" />
          </g>
        )}
      </svg>

      {/* CLI Status Badge */}
      <span className="absolute bottom-0 right-2 inline-flex items-center gap-1.5 border-2 border-[var(--ink)] bg-[var(--surface)] px-2 py-1 font-mono text-[10px] text-[var(--ink)] shadow-[2px_2px_0px_var(--ink)] transition-all duration-150 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:shadow-[4px_4px_0px_var(--accent)]">
        <span className="inline-block h-2 w-2" style={{ backgroundColor: beaconColor }} />
        dino: {isSleepy ? "sleepy" : isTurbo ? "sprint" : "run"}
      </span>
    </div>
  );
};

const TerminalBot = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const lineId = useRef(1);
  const historyIndex = useRef(-1);
  const running = useRef(false);
  const timers = useRef<number[]>([]);
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [lines, setLines] = useState<TerminalLine[]>([{ id: 0, content: 'type "help" or tap a command', tone: "accent" }]);
  const [typing, setTyping] = useState<{ id: number; full: string; visible: string } | null>(reduced ? null : { id: 0, full: 'type "help" or tap a command', visible: "" });
  const [state, setState] = useState<CharacterState>("idle");

  const append = (content: string | ReactNode, tone: TerminalLine["tone"] = "normal") => {
    const id = lineId.current++;
    setLines((current) => [...current, { id, content, tone }]);
    if (typeof content === "string" && !reduced) setTyping({ id, full: content, visible: "" });
  };
  const clear = () => { setLines([]); setTyping(null); setInput(""); };
  const wake = () => { if (state === "sleepy") setState("idle"); };

  useEffect(() => {
    if (!typing) return;
    if (reduced || typing.visible.length >= typing.full.length) { if (typing.visible.length >= typing.full.length) setTyping(null); return; }
    const timer = window.setTimeout(() => setTyping((current) => current ? { ...current, visible: current.full.slice(0, current.visible.length + 1) } : null), 15);
    return () => window.clearTimeout(timer);
  }, [typing, reduced]);

  useEffect(() => { if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight; }, [lines, typing]);
  useEffect(() => {
    const sleep = window.setTimeout(() => setState("sleepy"), 20000);
    return () => window.clearTimeout(sleep);
  }, [input, lines, state]);
  useEffect(() => () => timers.current.forEach((timer) => window.clearTimeout(timer)), []);

  const finish = (next: "happy" | "confused") => {
    setState(next);
    timers.current.push(window.setTimeout(() => setState("idle"), next === "happy" ? 1200 : 1500));
  };
  const route = (path: string) => {
    append(`routing -> ${path}`, "accent");
    setState("thinking");
    timers.current.push(window.setTimeout(() => setState("routing"), 180));
    timers.current.push(window.setTimeout(() => {
      finish("happy");
      navigate(path);
      window.setTimeout(() => { const heading = document.querySelector("h1"); heading?.setAttribute("tabindex", "-1"); heading?.focus(); }, 0);
      running.current = false;
    }, 350));
  };
  const run = (raw: string) => {
    if (running.current) return;
    const command = raw.trim();
    if (!command) return;
    running.current = true;
    setHistory((items) => [command, ...items.filter((item) => item !== command)].slice(0, 20));
    historyIndex.current = -1;
    setInput("");
    if (typing) setTyping({ ...typing, visible: typing.full });
    append(`sathvik@portfolio:~$ ${command}`);
    const { name, argument } = parseCommand(command);
    const match = matchIntent(argument || name);
    if (name === "clear") { clear(); running.current = false; finish("happy"); return; }
    if (name === "help") { append("help  ls  cd <page>  open <resume|github|linkedin>  projects  experience  skills  blogs  contact  whoami  clear"); finish("happy"); running.current = false; return; }
    if (name === "ls") { append("projects/  experience/  skills/  blogs/  contact/  resume.pdf"); finish("happy"); running.current = false; return; }
    if (name === "whoami") { append("Sathvik Konduri — B.Tech CSE (AI & ML), Methodist College of Engineering and Technology, Hyderabad."); finish("happy"); running.current = false; return; }
    if (name === "sudo" && argument === "hire sathvik") { append("permission granted", "accent"); route("/contact"); return; }
    if (name === "cd" && pagePaths[argument as keyof typeof pagePaths]) { route(pagePaths[argument as keyof typeof pagePaths]); return; }
    if (pagePaths[name as keyof typeof pagePaths]) { route(pagePaths[name as keyof typeof pagePaths]); return; }
    if (name === "resume") { window.open(contact.resume, "_blank", "noopener,noreferrer"); append(<a href={contact.resume} target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] underline">open resume.pdf ↗</a>, "accent"); finish("happy"); running.current = false; return; }
    if (name === "open" && ["resume", "github", "linkedin"].includes(argument)) { const target = argument === "resume" ? contact.resume : argument === "github" ? contact.github : contact.linkedin; window.open(target, "_blank", "noopener,noreferrer"); append(<a href={target} target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] underline">open {argument} ↗</a>, "accent"); finish("happy"); running.current = false; return; }
    if (match?.target && ["projects", "experience", "skills", "blogs", "contact"].includes(match.target) && ["cd", "open"].includes(name)) { route(intentTargetPath[match.target]); return; }
    const suggestion = match?.suggestion;
    append(<span>command not found: {command}{suggestion && <> · <button onClick={() => run(suggestion)} className="cursor-pointer text-[var(--accent)] underline hover:opacity-80">did you mean: {suggestion}?</button></>}</span>, "error");
    finish("confused");
    running.current = false;
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    wake();
    if (typing) setTyping({ ...typing, visible: typing.full });
    if (event.key === "Enter") { event.preventDefault(); run(input); }
    if (event.key === "Escape") { event.preventDefault(); setInput(""); setState("idle"); }
    if (event.key === "Tab") { event.preventDefault(); const match = commands.find((command) => command.startsWith(input.toLowerCase())); if (match) setInput(match); }
    if (event.key === "ArrowUp") { event.preventDefault(); const next = Math.min(historyIndex.current + 1, history.length - 1); historyIndex.current = next; setInput(history[next] ?? ""); }
    if (event.key === "ArrowDown") { event.preventDefault(); const next = Math.max(historyIndex.current - 1, -1); historyIndex.current = next; setInput(history[next] ?? ""); }
    if (event.ctrlKey && event.key.toLowerCase() === "l") { event.preventDefault(); clear(); }
  };

  return (
    <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)] lg:gap-8">
      <DeveloperCharacter state={state} />
      <div className="order-1 min-w-0 ink-box bg-[#181818] p-4 text-[#F4F2EC] shadow-[4px_4px_0px_#E12D26] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0px_#E12D26] sm:p-5 lg:order-2">
        <div ref={outputRef} aria-live="polite" className="h-[clamp(180px,35svh,280px)] overflow-y-auto font-mono text-xs leading-6 sm:h-[clamp(220px,32svh,300px)]">
          {lines.map((line) => (
            <div key={line.id} className={line.tone === "error" ? "text-[#E12D26]" : line.tone === "accent" ? "text-[#E12D26]" : ""}>
              {typing?.id === line.id ? typing.visible : line.content}
            </div>
          ))}
          {state === "thinking" && (
            <div className="text-[#E12D26]">
              thinking<span className="ml-1 inline-flex gap-0.5"><i>.</i><i>.</i><i>.</i></span>
            </div>
          )}
        </div>
        <form onSubmit={(event) => { event.preventDefault(); run(input); }} className="mt-3 flex items-center border-t border-[#5C5B57] pt-3">
          <label htmlFor="terminal-input" className="sr-only">Terminal command</label>
          <span className="mr-2 shrink-0 text-[#E12D26]">sathvik@portfolio:~$</span>
          <input
            id="terminal-input"
            ref={inputRef}
            value={input}
            onChange={(event) => { wake(); setInput(event.target.value); setState("listening"); }}
            onKeyDown={onKeyDown}
            aria-label="Terminal command"
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent font-mono text-sm text-[#F4F2EC] outline-none focus:ring-2 focus:ring-[#E12D26]"
          />
          <span className="ml-1 h-4 w-2 animate-pulse bg-[#E12D26]" aria-hidden="true" />
        </form>
        <div className="mt-3 flex flex-wrap gap-2">
          {["projects", "skills", "experience", "blogs", "resume", "contact"].map((command) => (
            <button
              key={command}
              type="button"
              onClick={() => run(command)}
              className="min-h-[44px] cursor-pointer border border-[#F4F2EC] px-3 font-mono text-[11px] text-[#F4F2EC] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-[#E12D26] hover:bg-[#E12D26] hover:text-[#181818] hover:shadow-[3px_3px_0px_#F4F2EC] active:translate-x-0 active:translate-y-0 active:shadow-none"
            >
              {command}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const HeroSection = () => (
  <section className="layout-shell grid min-h-[calc(100svh-76px)] items-center gap-8 py-10 sm:py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-[clamp(24px,4vw,64px)] lg:py-8">
    <div>
      <p className="inline-block font-mono text-xs uppercase tracking-widest text-[var(--accent)] transition-transform duration-200 hover:translate-x-1">
        01 // HYDERABAD, IN
      </p>
      <h1 className="font-display group mt-5 select-none text-[clamp(2.5rem,12vw,4rem)] leading-[0.95] lg:text-[clamp(4rem,7vw,6.5rem)]">
        <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">Sathvik</span>
        <br />
        <span className="inline-block text-[var(--accent)] transition-transform duration-200 group-hover:translate-x-2">Konduri.</span>
      </h1>
      <p className="mt-6 max-w-[60ch] text-lg leading-8 text-[var(--muted-ink)]">
        Based in Hyderabad. Turning rough ideas into things that work.
      </p>
      <div className="mt-6 flex flex-wrap gap-4">
        <a
          href={contact.github}
          target="_blank"
          rel="noopener noreferrer"
          className="ink-btn-secondary px-4 transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_var(--accent)] active:translate-x-0 active:translate-y-0 active:shadow-none"
        >
          <Github size={16} /> GitHub
        </a>
        <a
          href={contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="ink-btn-secondary px-4 transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_var(--accent)] active:translate-x-0 active:translate-y-0 active:shadow-none"
        >
          <Linkedin size={16} /> LinkedIn
        </a>
        <a
          href={contact.mailto}
          className="ink-btn-secondary px-4 transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_var(--accent)] active:translate-x-0 active:translate-y-0 active:shadow-none"
        >
          <Mail size={16} /> Email
        </a>
      </div>
    </div>
    <div className="min-w-0">
      <TerminalBot />
    </div>
  </section>
);

export { DeveloperCharacter, TerminalBot };
export default HeroSection;
