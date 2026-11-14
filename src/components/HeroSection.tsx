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
  const eyeRef = useRef<SVGGElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const visible = useRef(true);
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [blink, setBlink] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;
    const move = (event: MouseEvent) => {
      target.current.x = Math.max(-14, Math.min(14, ((event.clientX / window.innerWidth) - 0.5) * 28));
      target.current.y = Math.max(-10, Math.min(10, ((event.clientY / window.innerHeight) - 0.5) * -20));
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
        root.style.transform = `perspective(750px) rotateX(${current.current.y}deg) rotateY(${current.current.x}deg)`;
        const glanceX = state === "thinking" ? 5 : Math.max(-6, Math.min(6, current.current.x / 2.2));
        const glanceY = state === "thinking" ? -3 : Math.max(-5, Math.min(5, current.current.y / 2.2));
        eyeRef.current?.style.setProperty("transform", `translate3d(${glanceX}px, ${glanceY}px, 0)`);
      }
      frame = requestAnimationFrame(animate);
    };
    observer?.observe(root);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", recenter);
    frame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", recenter);
    };
  }, [reduced, state]);

  useEffect(() => {
    if (reduced) return;
    const timer = window.setInterval(() => {
      setBlink(true);
      window.setTimeout(() => setBlink(false), 140);
    }, 3600);
    return () => window.clearInterval(timer);
  }, [reduced]);

  const isBusy = state === "thinking" || state === "routing";
  const isSleepy = state === "sleepy";
  const coreColor =
    state === "happy" || state === "listening"
      ? "#22C55E"
      : isSleepy
        ? "#6B6A65"
        : "#E12D26";

  const triggerScan = () => {
    if (!reduced) setPulseKey((k) => k + 1);
  };

  return (
    <div
      ref={rootRef}
      onClick={triggerScan}
      onMouseEnter={triggerScan}
      aria-hidden="true"
      className="group order-2 relative mx-auto w-[65%] max-w-[235px] cursor-pointer select-none transition-transform duration-200 lg:order-1 lg:w-full lg:max-w-[280px]"
    >
      <style>{`
        @keyframes aiHover {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-7px); }
        }
        @keyframes aiOrbitCW {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes aiOrbitCCW {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes aiScanWave {
          0% { r: 34; opacity: 0.85; stroke-width: 3; }
          100% { r: 96; opacity: 0; stroke-width: 1; }
        }
        @keyframes aiEqBar {
          0%, 100% { transform: scaleY(0.35); }
          50% { transform: scaleY(1); }
        }
        @keyframes aiZzz {
          0% { opacity: 0; transform: translate(0, 4px); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: translate(10px, -16px); }
        }
      `}</style>

      <svg viewBox="0 0 260 250" className="w-full overflow-visible transition-transform duration-200 group-hover:scale-105">
        {pulseKey > 0 && !reduced && (
          <circle
            key={pulseKey}
            cx="130"
            cy="122"
            r="34"
            fill="none"
            stroke={coreColor}
            style={{ animation: "aiScanWave 0.75s cubic-bezier(.22,1,.36,1) forwards" }}
          />
        )}

        <g
          style={{
            transformOrigin: "130px 122px",
            animation: reduced || isSleepy ? "none" : `aiOrbitCW ${isBusy ? "3s" : "18s"} linear infinite`,
          }}
        >
          <circle
            cx="130"
            cy="122"
            r="84"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="1.5"
            strokeDasharray="6 10 2 10"
            opacity="0.35"
          />
          <circle cx="130" cy="38" r="4.5" fill={coreColor} stroke="var(--ink)" strokeWidth="2" />
          <circle cx="214" cy="122" r="4" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2" />
          <circle cx="130" cy="206" r="4.5" fill={coreColor} stroke="var(--ink)" strokeWidth="2" />
          <circle cx="46" cy="122" r="4" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2" />
        </g>

        <g
          style={{
            transformOrigin: "130px 122px",
            animation: reduced || isSleepy ? "none" : `aiOrbitCCW ${isBusy ? "2.2s" : "12s"} linear infinite`,
          }}
        >
          <circle
            cx="130"
            cy="122"
            r="66"
            fill="none"
            stroke={coreColor}
            strokeWidth="2"
            strokeDasharray="18 24"
            opacity="0.65"
          />
        </g>

        <g stroke="var(--ink)" strokeWidth="3.5" fill="none" strokeLinecap="square">
          <path d="M52 64H38v16" />
          <path d="M208 64h14v16" />
          <path d="M52 180H38v-16" />
          <path d="M208 180h14v-16" />
        </g>

        <g style={{ animation: reduced || isSleepy ? "none" : "aiHover 3.2s ease-in-out infinite" }}>
          <line x1="108" y1="68" x2="102" y2="48" stroke="var(--ink)" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="101" cy="45" r="4" fill={coreColor} stroke="var(--ink)" strokeWidth="2.5" />
          <line x1="152" y1="68" x2="158" y2="48" stroke="var(--ink)" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="159" cy="45" r="4" fill={coreColor} stroke="var(--ink)" strokeWidth="2.5" />

          <rect x="66" y="102" width="12" height="36" rx="2" fill={coreColor} stroke="var(--ink)" strokeWidth="3.5" />
          <rect x="182" y="102" width="12" height="36" rx="2" fill={coreColor} stroke="var(--ink)" strokeWidth="3.5" />

          <polygon
            points="92,68 168,68 184,84 184,156 168,172 92,172 76,156 76,84"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="4"
          />

          <rect x="88" y="84" width="84" height="56" rx="6" fill="#181818" stroke="var(--ink)" strokeWidth="3" />

          <g stroke="#F4F2EC" strokeWidth="1" opacity="0.08">
            <line x1="90" y1="96" x2="170" y2="96" />
            <line x1="90" y1="108" x2="170" y2="108" />
            <line x1="90" y1="120" x2="170" y2="120" />
            <line x1="90" y1="132" x2="170" y2="132" />
          </g>

          <g ref={eyeRef}>
            {isSleepy ? (
              <line x1="112" y1="112" x2="148" y2="112" stroke={coreColor} strokeWidth="4" strokeLinecap="round" />
            ) : blink ? (
              <line x1="108" y1="112" x2="152" y2="112" stroke={coreColor} strokeWidth="4" strokeLinecap="round" />
            ) : state === "happy" ? (
              <path
                d="M112 117L130 103L148 117"
                fill="none"
                stroke={coreColor}
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : state === "confused" ? (
              <text
                x="130"
                y="122"
                textAnchor="middle"
                fill="#E12D26"
                fontFamily="monospace"
                fontWeight="bold"
                fontSize="28"
              >
                ?
              </text>
            ) : (
              <>
                <circle
                  cx="130"
                  cy="112"
                  r={state === "listening" || isBusy ? 16 : 13}
                  fill="none"
                  stroke={coreColor}
                  strokeWidth="3.5"
                />
                <circle cx="130" cy="112" r={state === "listening" || isBusy ? 8 : 6} fill={coreColor} />
                <circle cx="134" cy="108" r="2.5" fill="#FAF9F5" />
              </>
            )}
          </g>

          <g transform="translate(106, 150)">
            {[0, 1, 2, 3, 4].map((bar) => (
              <rect
                key={bar}
                x={bar * 10}
                y="0"
                width="6"
                height="12"
                fill={isSleepy ? "#6B6A65" : coreColor}
                style={{
                  transformOrigin: `${bar * 10 + 3}px 12px`,
                  animation:
                    reduced || isSleepy
                      ? "none"
                      : `aiEqBar ${isBusy ? "0.28s" : state === "listening" ? "0.4s" : "1.1s"} ease-in-out ${bar * 0.12}s infinite`,
                }}
              />
            ))}
          </g>

          <path d="M110 172h40l-8 12h-24z" fill="var(--ink)" />
        </g>

        {isSleepy && !reduced && (
          <g fill="var(--ink)" fontFamily="monospace" fontWeight="bold">
            <text x="188" y="76" fontSize="13" style={{ animation: "aiZzz 2.2s ease-out infinite" }}>z</text>
            <text x="200" y="60" fontSize="16" style={{ animation: "aiZzz 2.2s ease-out 0.7s infinite" }}>Z</text>
          </g>
        )}
      </svg>

      <span className="absolute -bottom-1 right-2 inline-flex items-center gap-1.5 border-2 border-[var(--ink)] bg-[var(--surface)] px-2.5 py-1 font-mono text-[10px] font-bold text-[var(--ink)] shadow-[2px_2px_0px_var(--ink)] transition-all duration-150 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:shadow-[4px_4px_0px_var(--accent)]">
        <span
          className={`inline-block h-2 w-2 rounded-full ${isBusy || state === "listening" ? "animate-ping" : ""}`}
          style={{ backgroundColor: coreColor }}
        />
        ai.core: {state}
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

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("ai-bot-state", { detail: state }));
  }, [state]);

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
            <div key={line.id} className={line.tone === "error" || line.tone === "accent" ? "text-[#E12D26]" : ""}>
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
