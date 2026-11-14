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
        eyesRef.current?.style.setProperty("transform", `translate3d(${Math.max(-4, Math.min(4, current.current.x / 3))}px, ${Math.max(-4, Math.min(4, current.current.y / 2))}px, 0)`);
      }
      frame = requestAnimationFrame(animate);
    };
    observer?.observe(root);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", recenter);
    frame = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(frame); observer?.disconnect(); window.removeEventListener("mousemove", move); window.removeEventListener("mouseleave", recenter); };
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    const timer = window.setInterval(() => { setBlink(true); window.setTimeout(() => setBlink(false), 130); }, 3800);
    return () => window.clearInterval(timer);
  }, [reduced]);

  const eyebrowY = state === "confused" ? 140 : state === "happy" ? 143 : 146;
  return <div ref={rootRef} aria-hidden="true" className="order-2 pointer-events-none relative mx-auto w-[60%] max-w-[220px] transition-transform duration-200 lg:order-1 lg:w-full lg:max-w-[280px]">
    <svg viewBox="0 0 280 300" className="w-full"><path d="M75 248c12-48 118-48 130 0v30H75z" fill="#E12D26" stroke="#181818" strokeWidth="4" /><g style={{ transformOrigin: "140px 150px", transition: reduced ? "none" : "transform 220ms cubic-bezier(.22,1,.36,1)" }}><path d="M77 91c0-57 126-57 126 0v70c0 34-28 62-63 62s-63-28-63-62z" fill="#FAF9F5" stroke="#181818" strokeWidth="4" /><path d="M72 99c-13-57 30-88 75-79 47-5 72 33 60 81l-35-27c-23 13-65 14-100 25z" fill="#E12D26" stroke="#181818" strokeWidth="4" /><path d={`M97 ${eyebrowY}h20M163 ${eyebrowY}h20`} stroke="#181818" strokeWidth="4" strokeLinecap="round" /><g ref={eyesRef}><ellipse cx="111" cy="158" rx="7" ry={blink ? 1 : 8} fill="#181818" /><ellipse cx="169" cy="158" rx="7" ry={blink ? 1 : 8} fill="#181818" /></g>{state === "confused" ? <path d="M128 188c8-6 18-6 27 0" stroke="#181818" strokeWidth="4" strokeLinecap="round" /> : <path d={state === "happy" ? "M126 180c10 12 20 12 30 0" : "M128 184c9 8 18 8 27 0"} stroke="#181818" strokeWidth="4" strokeLinecap="round" />}<path d="M113 247v31M167 247v31" stroke="#181818" strokeWidth="4" /><path d="M98 275H75M182 275h23" stroke="#181818" strokeWidth="4" strokeLinecap="round" /></g></svg>
    <span className="absolute bottom-1 right-2 border-2 border-[var(--ink)] bg-[var(--surface)] px-2 py-1 font-mono text-[10px] shadow-[2px_2px_0px_var(--ink)]">node: {state}</span>
  </div>;
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
    append(<span>command not found: {command}{suggestion && <> · <button onClick={() => run(suggestion)} className="text-[var(--accent)] underline">did you mean: {suggestion}?</button></>}</span>, "error");
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

  return <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)] lg:gap-8"><DeveloperCharacter state={state} /><div className="order-1 min-w-0 ink-box bg-[#181818] p-4 text-[#F4F2EC] shadow-[4px_4px_0px_#E12D26] sm:p-5 lg:order-2"><div ref={outputRef} aria-live="polite" className="h-[clamp(180px,35svh,280px)] overflow-y-auto font-mono text-xs leading-6 sm:h-[clamp(220px,32svh,300px)]">{lines.map((line) => <div key={line.id} className={line.tone === "error" ? "text-[#E12D26]" : line.tone === "accent" ? "text-[#E12D26]" : ""}>{typing?.id === line.id ? typing.visible : line.content}</div>)}{state === "thinking" && <div className="text-[#E12D26]">thinking<span className="ml-1 inline-flex gap-0.5"><i>.</i><i>.</i><i>.</i></span></div>}</div><form onSubmit={(event) => { event.preventDefault(); run(input); }} className="mt-3 flex items-center border-t border-[#5C5B57] pt-3"><label htmlFor="terminal-input" className="sr-only">Terminal command</label><span className="mr-2 shrink-0 text-[#E12D26]">sathvik@portfolio:~$</span><input id="terminal-input" ref={inputRef} value={input} onChange={(event) => { wake(); setInput(event.target.value); setState("listening"); }} onKeyDown={onKeyDown} aria-label="Terminal command" autoComplete="off" className="min-w-0 flex-1 bg-transparent font-mono text-sm text-[#F4F2EC] outline-none focus:ring-2 focus:ring-[#E12D26]" /><span className="ml-1 h-4 w-2 animate-pulse bg-[#E12D26]" aria-hidden="true" /></form><div className="mt-3 flex flex-wrap gap-2">{["projects", "skills", "experience", "blogs", "resume", "contact"].map((command) => <button key={command} type="button" onClick={() => run(command)} className="min-h-[44px] border border-[#F4F2EC] px-3 font-mono text-[11px] text-[#F4F2EC] hover:border-[#E12D26] hover:text-[#E12D26]">{command}</button>)}</div></div></div>;
};

const HeroSection = () => <section className="layout-shell grid min-h-[calc(100svh-76px)] items-center gap-8 py-10 sm:py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-[clamp(24px,4vw,64px)] lg:py-8"><div><p className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">01 // HYDERABAD, IN</p><h1 className="font-display mt-5 text-[clamp(2.5rem,12vw,4rem)] leading-[0.95] lg:text-[clamp(4rem,7vw,6.5rem)]">Sathvik<br /><span className="text-[var(--accent)]">Konduri.</span></h1><p className="mt-6 max-w-[60ch] text-lg leading-8 text-[var(--muted-ink)]">Based in Hyderabad. Turning rough ideas into things that work.</p><div className="mt-6 flex flex-wrap gap-4"><a href={contact.github} target="_blank" rel="noopener noreferrer" className="ink-btn-secondary px-4"><Github size={16} /> GitHub</a><a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="ink-btn-secondary px-4"><Linkedin size={16} /> LinkedIn</a><a href={contact.mailto} className="ink-btn-secondary px-4"><Mail size={16} /> Email</a></div></div><div className="min-w-0"><TerminalBot /></div></section>;

export { DeveloperCharacter, TerminalBot };
export default HeroSection;
