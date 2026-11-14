import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Github, Linkedin, Mail, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { contact } from "@/data/portfolio";

const routes: Record<string, [string, string]> = {
  rag: ["/projects", "Routing to the project archive."], nlp: ["/projects", "Routing to NLP projects."], project: ["/projects", "Routing to the project archive."],
  fastapi: ["/skills", "Routing to backend and data skills."], skill: ["/skills", "Routing to the toolkit."], resume: ["/contact", "Routing to contact and resume."],
  internship: ["/experience", "Routing to experience."], leadership: ["/experience", "Routing to leadership."], blog: ["/blogs", "Routing to technical writing."], contact: ["/contact", "Routing to contact."],
};

const DeveloperCharacter = ({ routing }: { routing: boolean }) => {
  const [blink, setBlink] = useState(false);
  const [pupil, setPupil] = useState({ x: 0, y: 0 });
  useEffect(() => { const timer = window.setInterval(() => { setBlink(true); window.setTimeout(() => setBlink(false), 130); }, 3800); return () => window.clearInterval(timer); }, []);
  return <div onMouseMove={(event) => { const box = event.currentTarget.getBoundingClientRect(); setPupil({ x: (event.clientX - box.left - box.width / 2) / 35, y: (event.clientY - box.top - box.height / 2) / 45 }); }} className={`relative mx-auto w-full max-w-[280px] transition-transform duration-300 ${routing ? "-translate-y-2" : "animate-[float_4s_ease-in-out_infinite]"}`}>
    <svg viewBox="0 0 280 300" className="w-full" role="img" aria-label="Hand-drawn developer character"><path d="M75 248c12-48 118-48 130 0v30H75z" fill="#E12D26" stroke="#181818" strokeWidth="4" /><path d="M77 91c0-57 126-57 126 0v70c0 34-28 62-63 62s-63-28-63-62z" fill="#FAF9F5" stroke="#181818" strokeWidth="4" /><path d="M72 99c-13-57 30-88 75-79 47-5 72 33 60 81l-35-27c-23 13-65 14-100 25z" fill="#E12D26" stroke="#181818" strokeWidth="4" /><path d="M97 146h20M163 146h20" stroke="#181818" strokeWidth="4" strokeLinecap="round" /><ellipse cx={111 + pupil.x} cy={158 + pupil.y} rx="7" ry={blink ? 1 : 8} fill="#181818" /><ellipse cx={169 + pupil.x} cy={158 + pupil.y} rx="7" ry={blink ? 1 : 8} fill="#181818" /><path d="M128 184c9 8 18 8 27 0" stroke="#181818" strokeWidth="4" strokeLinecap="round" /><path d="M113 247v31M167 247v31" stroke="#181818" strokeWidth="4" /><path d="M98 275H75M182 275h23" stroke="#181818" strokeWidth="4" strokeLinecap="round" /></svg>
    <span className="absolute bottom-1 right-2 border-2 border-[var(--ink)] bg-[var(--surface)] px-2 py-1 font-mono text-[10px] shadow-[2px_2px_0px_var(--ink)]">node: {routing ? "routing" : "idle"}</span>
  </div>;
};

const HeroSection = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [routing, setRouting] = useState(false);
  const [trace, setTrace] = useState("");
  const route = (intent: string) => {
    const key = Object.keys(routes).find((candidate) => intent.toLowerCase().includes(candidate));
    if (!key) { setTrace("intent_unknown -> try RAG, FastAPI, NLP, resume"); return; }
    setRouting(true); setTrace(`intent_detected -> routing... ${routes[key][1]}`); window.setTimeout(() => navigate(routes[key][0]), 480);
  };
  return <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-20 sm:px-8 sm:pt-28 lg:grid-cols-[0.8fr_1.2fr]"><DeveloperCharacter routing={routing} /><div><p className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">01 // AI ENGINEER IN TRAINING</p><h1 className="font-display mt-5 text-5xl leading-[0.95] sm:text-7xl">Sathvik<br /><span className="text-[var(--accent)]">Konduri.</span></h1><p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--muted-ink)]">B.Tech Computer Science & Engineering (AI & ML) undergraduate at Methodist College of Engineering and Technology, Hyderabad. Expected 2027 · CGPA: 9.11/10.</p><div className="mt-7 flex flex-wrap gap-4"><a href={contact.github} target="_blank" rel="noopener noreferrer" className="ink-btn-secondary px-4"><Github size={16} /> GitHub</a><a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="ink-btn-secondary px-4"><Linkedin size={16} /> LinkedIn</a><a href={contact.mailto} className="ink-btn-secondary px-4"><Mail size={16} /> Email</a></div>
    <div className="ink-box mt-10 max-w-2xl p-5 sm:p-6"><p className="font-mono text-xs text-[var(--muted-ink)]">ROUTING BOT / READY</p><p className="mt-3 text-lg font-bold">What should we inspect?</p><div className="mt-4 flex flex-wrap gap-2">{[["Inspect Projects", "/projects"], ["View Experience", "/experience"], ["Explore Skills", "/skills"], ["Read Blogs", "/blogs"], ["Contact Sathvik", "/contact"]].map(([label, path]) => <button key={path} onClick={() => navigate(path)} className="min-h-[44px] border-2 border-[var(--ink)] px-3 text-left text-xs font-bold hover:bg-[var(--ink)] hover:text-[var(--page-bg)]">{label}</button>)}</div><form onSubmit={(event) => { event.preventDefault(); route(inputRef.current?.value ?? ""); }} className="mt-4 flex gap-2"><input ref={inputRef} aria-label="Route by keyword" placeholder="Type a keyword (e.g., RAG, FastAPI, NLP, resume)..." className="min-h-[44px] min-w-0 flex-1 border-2 border-[var(--ink)] bg-transparent px-3 text-xs outline-none focus:border-[var(--accent)]" /><button className="ink-btn-primary min-w-[44px] px-3" aria-label="Route"><Send size={16} /></button></form>{trace && <p className="mt-3 font-mono text-[11px] text-[var(--accent)]">{trace}</p>}</div>
    <a href={contact.portfolio} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-[44px] items-center gap-2 text-sm font-bold hover:text-[var(--accent)]">External portfolio <ArrowUpRight size={15} /></a></div></section>;
};
export default HeroSection;
