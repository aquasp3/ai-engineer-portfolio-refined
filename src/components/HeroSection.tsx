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
        const glanceX = state === "thinking" ? 3 : Math.max(-3, Math.min(3, current.current.x / 4));
        const glanceY = state === "thinking" ? -2 : Math.max(-3, Math.min(3, current.current.y / 3));
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

  const isRunning = state === "thinking" || state === "routing";
  const isJumping = state === "happy";
  const beaconColor =
    state === "happy" || state === "listening"
      ? "#22C55E"
      : state === "sleepy"
        ? "#5C5B57"
        : "#E12D26";

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="group order-2 relative mx-auto w-[65%] max-w-[230px] cursor-pointer transition-transform duration-200 lg:order-1 lg:w-full lg:max-w-[280px]"
    >
      <style>{`
        @keyframes dinoIdle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        @keyframes dinoJump {
          0%, 100% { transform: translateY(0px); }
          40% { transform: translateY(-22px); }
        }
        @keyframes dinoSprint {
          0%, 100% { transform: translateY(0px) rotate(4deg); }
          50% { transform: translateY(-6px) rotate(4deg); }
        }
        @keyframes dinoLegLeft {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes dinoLegRight {
          0%, 100% { transform: translateY(-6px); }
          50% { transform: translateY(0px); }
        }
        @keyframes dinoGround {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 32; }
        }
        @keyframes dinoZzz {
          0% { opacity: 0; transform: translate(0, 4px); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: translate(10px, -16px); }
        }
      `}</style>

      <svg
        viewBox="0 0 280 280"
        shapeRendering="crispEdges"
        className="w-full overflow-visible transition-transform duration-200 group-hover:scale-105"
      >
        {/* Pixel Clouds */}
        <g fill="#181818" opacity="0.16">
          <rect x="34" y="42" width="36" height="6" />
          <rect x="42" y="36" width="20" height="6" />
          <rect x="200" y="58" width="42" height="6" />
          <rect x="210" y="52" width="22" height="6" />
        </g>

        {/* Ground Track */}
        <line x1="20" y1="226" x2="260" y2="226" stroke="#181818" strokeWidth="4" />
        <line
          x1="24"
          y1="236"
          x2="256"
          y2="236"
          stroke="#181818"
          strokeWidth="4"
          strokeDasharray="6 10"
          style={{
            animation: reduced
              ? "none"
              : isRunning
                ? "dinoGround 0.35s linear infinite"
                : "dinoGround 2.4s linear infinite",
          }}
        />

        {/* Mini Pixel Cactus */}
        <g fill="#E12D26" stroke="#181818" strokeWidth="3">
          <rect x="216" y="184" width="10" height="42" />
          <rect x="206" y="196" width="10" height="8" />
          <rect x="206" y="188" width="6" height="10" />
          <rect x="226" y="200" width="10" height="8" />
          <rect x="230" y="190" width="6" height="12" />
        </g>

        {/* Main Pixel Dino Character */}
        <g
          style={{
            transformOrigin: "130px 180px",
            animation: reduced
              ? "none"
              : isJumping
                ? "dinoJump 0.55s ease-out infinite"
                : isRunning
                  ? "dinoSprint 0.28s ease-in-out infinite"
                  : state === "sleepy"
                    ? "none"
                    : "dinoIdle 2.2s ease-in-out infinite",
          }}
        >
          {/* Tail */}
          <rect x="52" y="148" width="12" height="24" fill="#181818" />
          <rect x="64" y="156" width="12" height="24" fill="#181818" />
          <rect x="76" y="162" width="12" height="26" fill="#181818" />

          {/* Torso */}
          <rect x="88" y="136" width="54" height="58" fill="#181818" />
          {/* Belly Highlight */}
          <rect x="116" y="148" width="20" height="36" fill="#FAF9F5" />

          {/* Red CLI Scarf / Collar */}
          <rect x="96" y="128" width="54" height="10" fill="#E12D26" />
          <rect x="86" y="134" width="14" height="18" fill="#E12D26" />

          {/* Little T-Rex Arms */}
          <rect x="142" y="150" width="18" height="8" fill="#181818" />
          <rect x="154" y="158" width="6" height="8" fill="#181818" />

          {/* Dino Head */}
          <rect x="104" y="72" width="76" height="56" fill="#181818" />
          {/* Snout Tip */}
          <rect x="180" y="80" width="12" height="32" fill="#181818" />
          {/* Red Dorsal Spikes */}
          <rect x="96" y="82" width="8" height="10" fill="#E12D26" />
          <rect x="96" y="100" width="8" height="10" fill="#E12D26" />

          {/* Jaw / Mouth */}
          {state === "happy" || state === "listening" ? (
            <>
              {/* Open Roar / Happy Jaw */}
              <rect x="122" y="112" width="64" height="6" fill="#FAF9F5" />
              <rect x="116" y="118" width="62" height="10" fill="#181818" />
            </>
          ) : (
            <rect x="134" y="112" width="46" height="4" fill="#FAF9F5" />
          )}

          {/* Eye Socket */}
          <rect x="122" y="84" width="18" height="18" fill="#FAF9F5" />

          {/* Eye Pupil by State */}
          <g ref={eyesRef}>
            {state === "sleepy" ? (
              <rect x="124" y="92" width="14" height="4" fill="#181818" />
            ) : blink ? (
              <rect x="124" y="92" width="14" height="4" fill="#181818" />
            ) : state === "confused" ? (
              <>
                <rect x="126" y="88" width="10" height="10" fill="#E12D26" />
                <rect x="129" y="91" width="4" height="4" fill="#FAF9F5" />
              </>
            ) : (
              <>
                <rect x="128" y="88" width="10" height="10" fill="#181818" />
                <rect x="132" y="89" width="3" height="3" fill="#FAF9F5" />
              </>
            )}
          </g>

          {/* Left Leg */}
          <g
            style={{
              animation: reduced || !isRunning ? "none" : "dinoLegLeft 0.25s steps(2) infinite",
            }}
          >
            <rect x="96" y="194" width="14" height="24" fill="#181818" />
            <rect x="96" y="218" width="22" height="8" fill="#181818" />
          </g>

          {/* Right Leg */}
          <g
            style={{
              animation: reduced || !isRunning ? "none" : "dinoLegRight 0.25s steps(2) infinite",
            }}
          >
            <rect x="124" y="194" width="14" height="24" fill="#181818" />
            <rect x="124" y="218" width="22" height="8" fill="#181818" />
          </g>
        </g>

        {/* State Overlays */}
        {state === "sleepy" && !reduced && (
          <g fill="#181818" fontFamily="monospace" fontWeight="bold">
            <text x="192" y="76" fontSize="14" style={{ animation: "dinoZzz 2.2s ease-out infinite" }}>z</text>
            <text x="206" y="60" fontSize="18" style={{ animation: "dinoZzz 2.2s ease-out 0.7s infinite" }}>Z</text>
          </g>
        )}

        {state === "confused" && (
          <text x="196" y="74" fill="#E12D26" fontFamily="monospace" fontWeight="bold" fontSize="22">
            ?
          </text>
        )}

        {isRunning && !reduced && (
          <g fill="#E12D26">
            <rect x="198" y="68" width="6" height="6" className="animate-bounce" />
            <rect x="210" y="60" width="6" height="6" className="animate-bounce [animation-delay:120ms]" />
            <rect x="222" y="52" width="6" height="6" className="animate-bounce [animation-delay:240ms]" />
          </g>
        )}
      </svg>

      {/* CLI Status Badge */}
      <span className="absolute bottom-1 right-2 inline-flex items-center gap-1.5 border-2 border-[var(--ink)] bg-[var(--surface)] px-2 py-1 font-mono text-[10px] shadow-[2px_2px_0px_var(--ink)] transition-all duration-150 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:shadow-[4px_4px_0px_var(--accent)]">
        <span className="inline-block h-2 w-2" style={{ backgroundColor: beaconColor }} />
        dino: {state}
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
