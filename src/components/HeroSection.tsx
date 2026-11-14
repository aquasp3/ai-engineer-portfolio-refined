import { ArrowDown, FileText, Github, Linkedin, Mail } from "lucide-react";

const RESUME_PATH = "/Sathvik-Konduri-Resume.pdf";
const stats = [["9.11", "CGPA"], ["87%", "NLP Accuracy"], ["0.85", "R² AQI Model"], ["+12%", "Internship Lift"]];

const HeroSection = () => (
  <section id="top" className="mx-auto max-w-6xl px-5 pb-16 pt-20 sm:px-8 sm:pt-28">
    <div className="grid items-end gap-12 lg:grid-cols-[1.25fr_0.75fr]">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">01 // AI & ML Engineer in training</p>
        <h1 className="font-display mt-5 max-w-4xl text-5xl leading-[0.95] sm:text-7xl">Sathvik<br /><span className="text-[var(--accent)]">Konduri.</span></h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--muted-ink)]">B.Tech CSE (AI & ML) undergraduate at Methodist College of Engineering and Technology, Hyderabad. I build practical machine learning systems, backend tools, and human-centered AI experiments.</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href="#projects" className="ink-btn-primary px-5"><ArrowDown size={16} /> See the work</a>
          <a href={RESUME_PATH} target="_blank" rel="noopener noreferrer" className="ink-btn-secondary px-5"><FileText size={16} /> Resume</a>
        </div>
        <div className="mt-7 flex flex-wrap gap-5 text-sm font-bold">
          <a href="https://github.com/aquasp3" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-2 hover:text-[var(--accent)]"><Github size={17} /> GitHub</a>
          <a href="https://www.linkedin.com/in/sathvik-konduri" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-2 hover:text-[var(--accent)]"><Linkedin size={17} /> LinkedIn</a>
          <a href="mailto:sathvikkonduri14@gmail.com" className="inline-flex min-h-[44px] items-center gap-2 hover:text-[var(--accent)]"><Mail size={17} /> Email</a>
        </div>
      </div>
      <div className="ink-box p-5 sm:p-7">
        <p className="font-mono text-xs text-[var(--muted-ink)]">PROFILE / 2026</p>
        <p className="mt-5 text-xl font-bold leading-8">Hyderabad, Telangana, India<br /><span className="text-[var(--accent)]">Expected graduation: 2027</span></p>
        <div className="mt-8 border-t-2 border-[var(--ink)] pt-5 text-sm leading-7 text-[var(--muted-ink)]">Curious about NLP, retrieval systems, agentic workflows, and the engineering details that make AI useful.</div>
      </div>
    </div>
    <svg aria-hidden="true" className="mt-14 h-8 w-full text-[var(--accent)]" viewBox="0 0 1200 40" fill="none" preserveAspectRatio="none"><path d="M0 20C120 2 180 38 300 20S480 2 600 20s180 18 300 0 180-18 300 0" stroke="currentColor" strokeWidth="2" /></svg>
    <div className="grid grid-cols-2 border-y-2 border-[var(--ink)] sm:grid-cols-4">
      {stats.map(([value, label]) => <div key={label} className="border-r-2 border-[var(--ink)] px-3 py-5 last:border-r-0 sm:px-5"><p className="font-mono text-xl font-medium">{value}</p><p className="mt-1 text-xs font-bold uppercase tracking-wide text-[var(--muted-ink)]">{label}</p></div>)}
    </div>
  </section>
);

export default HeroSection;
