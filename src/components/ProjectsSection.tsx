import { ArrowUpRight, Github } from "lucide-react";

const projects = [
  ["RAG-Based SaaS Billing Assistant (HITL)", "Retrieval-augmented answers grounded in enterprise documentation, with Human-in-the-Loop approval before refund actions.", ["LangGraph", "Ollama", "ChromaDB", "Python"], "rag-billing-assistant-hitl"],
  ["Medical Appointment Booking System", "RESTful APIs for appointments, doctor availability, patient bookings, validation, CRUD operations, and specialty filtering.", ["Python", "FastAPI"], "fastapi-medical-appointment-system"],
  ["Fake News Detection", "An NLP classification pipeline using preprocessing, feature engineering, and model evaluation to reach 87% accuracy.", ["Python", "Scikit-Learn", "NLP", "TF-IDF"], "fake-news-detection"],
  ["Air Quality Index (AQI) Prediction", "Regression modeling and exploratory analysis of environmental data, achieving an R² score of 0.85.", ["Python", "Pandas", "Scikit-Learn"], "ai-engineer-portfolio-refined"],
];

const ProjectsSection = () => <section id="projects" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
  <div className="mb-8"><p className="font-mono text-xs text-[var(--accent)]">04 // SELECTED WORK</p><h2 className="font-display mt-3 text-4xl sm:text-5xl">More things I’ve built.</h2></div>
  <div className="grid gap-5 md:grid-cols-2">{projects.map(([title, description, tech, repo], index) => <article key={title} className={`ink-box flex flex-col p-5 sm:p-7 ${index % 2 ? "rotate-1" : "-rotate-1"} md:hover:rotate-0`}><div className="flex items-start justify-between gap-4"><span className="font-mono text-xs text-[var(--accent)]">0{index + 2} //</span><a href={`https://github.com/aquasp3/${repo}`} target="_blank" rel="noopener noreferrer" aria-label={`Open ${title} repository`} className="min-h-[44px] min-w-[44px] text-right hover:text-[var(--accent)]"><ArrowUpRight size={20} className="ml-auto" /></a></div><h3 className="font-display mt-5 text-2xl">{title}</h3><p className="mt-3 flex-1 leading-7 text-[var(--muted-ink)]">{description}</p><div className="mt-6 flex flex-wrap gap-2">{(tech as string[]).map((item) => <span key={item} className="border-2 border-[var(--ink)] px-2 py-1 font-mono text-[11px]">{item}</span>)}</div><a href={`https://github.com/aquasp3/${repo}`} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-[44px] items-center gap-2 text-sm font-bold hover:text-[var(--accent)]"><Github size={16} /> Repository</a></article>)}</div>
</section>;
export default ProjectsSection;
