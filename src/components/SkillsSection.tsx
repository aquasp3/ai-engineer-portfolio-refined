const skillCategories = [
  ["Programming", ["Python", "Java", "C", "SQL"]],
  ["AI & Machine Learning", ["Machine Learning", "NLP", "RAG", "LangGraph", "Ollama", "ChromaDB", "Scikit-Learn", "TensorFlow"]],
  ["Backend & Data", ["FastAPI", "REST APIs", "CRUD Architecture", "Pandas", "NumPy", "Plotly"]],
  ["Tools", ["Git", "GitHub", "Streamlit", "Jupyter"]],
];
const SkillsSection = () => <section id="skills" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24"><div className="mb-8"><p className="font-mono text-xs text-[var(--accent)]">06 // TOOLKIT</p><h2 className="font-display mt-3 text-4xl sm:text-5xl">Skills, without<br />the progress bars.</h2></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{skillCategories.map(([title, skills]) => <div key={title} className="ink-box p-5"><h3 className="font-display text-xl">{title}</h3><div className="mt-5 space-y-3">{(skills as string[]).map((skill) => <p key={skill} className="border-b border-[var(--ink)] pb-2 font-mono text-xs text-[var(--muted-ink)]">{skill}</p>)}</div></div>)}</div></section>;
export default SkillsSection;
