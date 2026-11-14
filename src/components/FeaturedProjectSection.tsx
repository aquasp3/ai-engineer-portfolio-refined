import { ArrowUpRight, Github } from "lucide-react";

const FeaturedProjectSection = () => (
  <section id="featured" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
    <div className="mb-8 flex items-end justify-between gap-4"><div><p className="font-mono text-xs text-[var(--accent)]">03 // FEATURED PROJECT</p><h2 className="font-display mt-3 text-4xl sm:text-5xl">Decision support,<br />built for the field.</h2></div><span className="hidden font-mono text-xs text-[var(--muted-ink)] sm:block">01 / 05</span></div>
    <article className="ink-box grid overflow-hidden md:grid-cols-[0.8fr_1.2fr]">
      <div className="flex min-h-[300px] flex-col justify-between border-b-2 border-[var(--ink)] bg-[var(--ink)] p-6 text-[var(--page-bg)] md:border-b-0 md:border-r-2 sm:p-8">
        <div><p className="font-mono text-xs text-[var(--accent)]">INDIA POST / DSS</p><h3 className="font-display mt-5 text-3xl">India Post Decision Support System</h3></div>
        <a href="https://github.com/aquasp3/India-Post-Decision-support-system" target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex min-h-[44px] items-center gap-2 text-sm font-bold text-white hover:text-[var(--accent)]"><Github size={17} /> View repository <ArrowUpRight size={16} /></a>
      </div>
      <div className="p-6 sm:p-8"><p className="text-base leading-8 text-[var(--muted-ink)]">A modular system enabling India Post officers to generate data-driven 12-month rural outreach plans from village demographic and environmental data. It combines demographic analysis, environmental risk assessment, lifecycle-aware scheduling, campaign diversity, explainable business rules, multilingual UI, interactive dashboards, and PDF/CSV export.</p><div className="mt-7 flex flex-wrap gap-2">{["Python", "Streamlit", "Pandas", "Plotly", "Scikit-Learn"].map((item) => <span key={item} className="border-2 border-[var(--ink)] px-3 py-2 font-mono text-xs">{item}</span>)}</div></div>
    </article>
  </section>
);
export default FeaturedProjectSection;
