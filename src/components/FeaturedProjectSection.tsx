import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from "lucide-react";

type Project = {
  title: string;
  tag: string;
  summary: string;
  outcome: string;
  repo: string;
  stack: string[];
  nodes: string[];
};

const projects: Project[] = [
  {
    title: "India Post Decision Support System",
    tag: "PYTHON / STREAMLIT / PLANNING",
    summary: "Generates explainable 12-month rural outreach plans from village demographic and environmental data.",
    outcome: "Multilingual dashboards with PDF/CSV export.",
    repo: "India-Post-Decision-support-system",
    stack: ["Python", "Streamlit", "Pandas", "Plotly", "Scikit-Learn"],
    nodes: ["Village data", "Risk analysis", "Outreach plan"],
  },
  {
    title: "RAG-Based SaaS Billing Assistant (HITL)",
    tag: "LANGGRAPH / OLLAMA / RAG",
    summary: "Answers SaaS billing queries from grounded enterprise documentation through discrete retrieval and generation stages.",
    outcome: "HITL approval required before refund actions.",
    repo: "rag-billing-assistant-hitl",
    stack: ["LangGraph", "Ollama", "ChromaDB", "Python"],
    nodes: ["Docs", "Retrieve", "Approve refund"],
  },
  {
    title: "Medical Appointment Booking System",
    tag: "PYTHON / FASTAPI / REST",
    summary: "Provides RESTful APIs for appointment scheduling, doctor availability, and patient bookings.",
    outcome: "Validated CRUD with specialty and availability search.",
    repo: "fastapi-medical-appointment-system",
    stack: ["Python", "FastAPI"],
    nodes: ["Patients", "Availability", "Bookings"],
  },
  {
    title: "Fake News Detection",
    tag: "NLP / TF-IDF / CLASSIFICATION",
    summary: "Classifies news text with preprocessing, feature engineering, and model evaluation.",
    outcome: "87% reported accuracy.",
    repo: "fake-news-detection",
    stack: ["Python", "Scikit-Learn", "NLP", "TF-IDF"],
    nodes: ["Raw text", "TF-IDF", "Classifier"],
  },
  {
    title: "Air Quality Index (AQI) Prediction",
    tag: "REGRESSION / PANDAS / MODELING",
    summary: "Uses exploratory analysis and regression modeling to predict air-quality values from environmental data.",
    outcome: "R² = 0.85.",
    repo: "ai-engineer-portfolio-refined",
    stack: ["Python", "Pandas", "Scikit-Learn"],
    nodes: ["Air data", "Features", "AQI estimate"],
  },
];

const Preview = ({ project }: { project: Project }) => (
  <div className="relative mx-auto flex min-h-[260px] w-full max-w-3xl items-center justify-center overflow-hidden border-2 border-[var(--ink)] bg-[var(--surface)] p-6 shadow-[4px_4px_0px_var(--ink)] sm:min-h-[330px] sm:p-10">
    <div className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-widest text-[var(--muted-ink)]">SYSTEM MAP / {String(projects.indexOf(project) + 1).padStart(2, "0")}</div>
    <svg aria-hidden="true" className="h-full w-full max-w-2xl" viewBox="0 0 720 230" fill="none">
      <path d="M130 115H265M455 115h135" stroke="var(--accent)" strokeWidth="2" strokeDasharray="7 7" />
      <path d="M340 48v134" stroke="var(--ink)" strokeWidth="2" strokeDasharray="4 8" />
      {[{ x: 40, label: project.nodes[0] }, { x: 265, label: project.nodes[1] }, { x: 490, label: project.nodes[2] }].map((node, index) => (
        <g key={node.label}>
          <rect x={node.x} y="78" width="130" height="74" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2" />
          <circle cx={node.x + 16} cy="95" r="5" fill={index === 1 ? "var(--accent)" : "var(--ink)"} />
          <text x={node.x + 16} y="126" fill="var(--ink)" fontSize="12" fontFamily="DM Mono, monospace">{node.label}</text>
        </g>
      ))}
      <path d="M55 38c50-25 100 25 150 0s100-25 150 0 100 25 150 0 100-25 150 0" stroke="var(--accent)" strokeWidth="2" />
    </svg>
  </div>
);

const FeaturedProjectSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const project = projects[activeIndex];
  const nextProject = () => setActiveIndex((index) => (index + 1) % projects.length);
  const previousProject = () => setActiveIndex((index) => (index - 1 + projects.length) % projects.length);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") nextProject();
      if (event.key === "ArrowLeft") previousProject();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <section id="featured" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24" aria-label="Featured project switcher">
      <div className="mb-8 text-center">
        <p className="font-mono text-xs text-[var(--accent)]">03 // PROJECT INDEX</p>
        <h2 className="font-display mt-3 text-4xl sm:text-5xl">Five systems, one<br />curious workflow.</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[var(--muted-ink)]">Use the arrows or your keyboard to move through the project archive.</p>
      </div>

      <div className="flex items-center justify-center gap-3 sm:gap-6">
        <button type="button" onClick={previousProject} aria-label="Previous project" className="order-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[var(--ink)] bg-[var(--surface)] shadow-[2px_2px_0px_var(--accent)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 sm:order-1"><ArrowLeft size={18} /></button>
        <div className="order-1 min-w-0 flex-1 sm:order-2"><Preview project={project} /></div>
        <button type="button" onClick={nextProject} aria-label="Next project" className="order-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[var(--ink)] bg-[var(--surface)] shadow-[2px_2px_0px_var(--accent)] transition-transform hover:translate-x-0.5 hover:-translate-y-0.5"><ArrowRight size={18} /></button>
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <p className="mt-8 font-mono text-xs tracking-wider text-[var(--accent)]">{project.tag}</p>
        <h3 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{project.title}</h3>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[var(--muted-ink)]">{project.summary} <span className="font-bold text-[var(--ink)]">{project.outcome}</span></p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">{project.stack.map((item) => <span key={item} className="border-2 border-[var(--ink)] px-2.5 py-1 font-mono text-[11px]">{item}</span>)}</div>
        <div className="mt-7 flex flex-wrap justify-center gap-4">
          <a href={`https://github.com/aquasp3/${project.repo}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-2 border-2 border-[var(--ink)] bg-[var(--accent)] px-5 font-bold text-white shadow-[3px_3px_0px_var(--ink)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"><Github size={16} /> GitHub Repo <ArrowUpRight size={16} /></a>
          <button type="button" onClick={nextProject} className="inline-flex min-h-[44px] items-center gap-2 border-2 border-[var(--ink)] bg-[var(--surface)] px-5 font-bold shadow-[3px_3px_0px_var(--ink)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5">Next Project <ArrowRight size={16} /></button>
        </div>
        <p className="mt-5 font-mono text-[11px] text-[var(--muted-ink)]">{String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</p>
      </div>
    </section>
  );
};

export default FeaturedProjectSection;
