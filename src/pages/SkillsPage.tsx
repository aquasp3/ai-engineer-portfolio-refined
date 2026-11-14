import { useEffect, useMemo, useRef, useState } from "react";
import { certifications, projects, skills } from "@/data/portfolio";

const certificationDetails = certifications.map((value) => {
  const year = value.match(/\((\d{4})\)$/)?.[1];
  const withoutYear = year ? value.replace(` (${year})`, "") : value;
  const [title, issuer] = withoutYear.split(" — ");
  return { title, issuer, year };
});

const SkillsPage = () => {
  const categories = Object.entries(skills);
  const [filter, setFilter] = useState("All");
  const [selectedSkill, setSelectedSkill] = useState("");
  const certificationsRef = useRef<HTMLDivElement>(null);
  const [certificationsVisible, setCertificationsVisible] = useState(false);
  const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const visibleCategories = useMemo(() => filter === "All" ? categories : categories.filter(([title]) => title === filter), [categories, filter]);
  const relatedProjects = selectedSkill ? projects.filter((project) => project.stack.includes(selectedSkill)) : [];

  useEffect(() => {
    const node = certificationsRef.current;
    if (!node || !("IntersectionObserver" in window)) { setCertificationsVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setCertificationsVisible(true); observer.disconnect(); } }, { threshold: 0.15 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <section className="layout-shell py-12 sm:py-20">
    <p className="font-mono text-xs text-[var(--accent)]">04 // SKILLS</p>
    <h1 className="font-display mt-3 text-5xl sm:text-6xl">The working<br />toolkit.</h1>
    <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Skill categories">
      {["All", ...categories.map(([title]) => title)].map((item) => <button key={item} type="button" role="tab" aria-selected={filter === item} onClick={() => setFilter(item)} className={`min-h-[44px] border-2 px-4 font-mono text-xs shadow-[2px_2px_0px_var(--ink)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)] ${filter === item ? "border-[var(--accent)] bg-[var(--accent)] text-white" : "border-[var(--ink)] bg-[var(--surface)] hover:border-[var(--accent)]"}`}>{item}</button>)}
    </div>
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-live="polite">
      {visibleCategories.map(([title, items]) => <section key={title} className="ink-box p-5 transition-opacity duration-150" aria-labelledby={`skills-${title}`}><p className="font-mono text-[10px] tracking-widest text-[var(--accent)]">CATEGORY</p><h2 id={`skills-${title}`} className="font-display mt-2 text-xl">{title}</h2><div className="my-4 h-px bg-[var(--ink)]" /> <div className="flex flex-wrap gap-2">{items.map((item) => <button key={item} type="button" onClick={() => setSelectedSkill(item)} className={`min-h-[44px] border-2 px-3 py-2 font-mono text-xs shadow-[2px_2px_0px_var(--ink)] transition-transform duration-150 hover:-translate-y-0.5 hover:border-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)] ${selectedSkill === item ? "border-[var(--accent)] text-[var(--accent)]" : "border-[var(--ink)] bg-[var(--surface)]"}`}>{item}</button>)}</div></section>)}
    </div>
    {selectedSkill && relatedProjects.length > 0 && <p className="mt-5 font-mono text-xs text-[var(--muted-ink)]" aria-live="polite">Related projects: {relatedProjects.map((project) => project.title).join(" · ")}</p>}
    <section ref={certificationsRef} className="mt-16" aria-labelledby="certifications-title">
      <p className="font-mono text-xs text-[var(--accent)]">05 // CREDENTIALS</p>
      <h2 id="certifications-title" className="font-display mt-3 text-3xl sm:text-4xl">Certifications.</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{certificationDetails.map((certification, index) => <article key={certification.title} className="ink-box min-h-[150px] border-t-2 p-5 transition-[opacity,transform,border-color] duration-300 hover:border-t-[var(--accent)]" style={{ opacity: certificationsVisible || reducedMotion ? 1 : 0, transform: certificationsVisible || reducedMotion ? "translateY(0)" : "translateY(12px)", transitionDelay: reducedMotion ? "0ms" : `${index * 70}ms` }} onPointerMove={(event) => { if (reducedMotion) return; const rect = event.currentTarget.getBoundingClientRect(); const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 10; const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -10; event.currentTarget.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`; }} onPointerLeave={(event) => { event.currentTarget.style.transform = certificationsVisible || reducedMotion ? "translateY(0)" : "translateY(12px)"; }}><p className="font-mono text-xs text-[var(--accent)]">{String(index + 1).padStart(2, "0")}</p><h3 className="mt-6 font-display text-xl">{certification.title}</h3>{certification.issuer && <p className="mt-2 text-sm text-[var(--muted-ink)]">{certification.issuer}</p>}{certification.year && <p className="mt-1 font-mono text-xs text-[var(--muted-ink)]">{certification.year}</p>}</article>)}</div>
    </section>
  </section>;
};

export default SkillsPage;
