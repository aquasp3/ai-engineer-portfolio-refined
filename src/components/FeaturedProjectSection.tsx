import { Github, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import GlassSection from "./GlassSection";

const FEATURED_PROJECT = {
  title: "AI Resume Builder",
  description: [
    "Built an AI-powered workflow that turns unstructured user input into a job-ready resume draft.",
    "Used prompt design and output formatting to keep the generated content structured, editable, and recruiter-friendly.",
    "Focused on practical LLM application design, with consistent output quality and clean UX patterns.",
  ],
  tech: ["LLMs", "Prompt Engineering", "Python", "React", "LangChain"],
  liveDemo: "https://github.com/aquasp3/ai-engineer-portfolio-refined",
  codeUrl: "https://github.com/aquasp3",
};

const FeaturedProjectSection = () => {
  return (
    <GlassSection id="featured">
      <div className="mb-8 flex flex-col gap-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em]" style={{ color: "var(--secondary-color)" }}>
          Featured Work
        </p>
        <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: "var(--text-body)" }}>
          Featured Project
        </h2>
        <div className="w-12 h-1 rounded-full" style={{ background: "var(--accent-color)", opacity: 0.55 }} />
        <p className="max-w-2xl text-sm leading-relaxed" style={{ color: "var(--text-body)", opacity: 0.84 }}>
          The highest-signal project in the portfolio, showing how I design LLM-driven product flows that stay structured, editable, and practical for real use.
        </p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5, scale: 1.015 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="elite-card rounded-xl p-6 md:p-8"
        style={{ boxShadow: "0 12px 24px var(--border-color)" }}
      >
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span
            className="rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
            style={{
              background: "var(--card-bg)",
              color: "var(--accent-color)",
              borderColor: "var(--border-color)",
            }}
          >
            GenAI
          </span>
          <span
            className="rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
            style={{
              background: "var(--card-bg)",
              color: "var(--secondary-color)",
              borderColor: "var(--border-color)",
            }}
          >
            Product UX
          </span>
          <span
            className="rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
            style={{
              background: "var(--card-bg)",
              color: "var(--secondary-color)",
              borderColor: "var(--border-color)",
            }}
          >
            Resume Systems
          </span>
        </div>

        <div className="mb-5 space-y-3 border-b pb-5" style={{ borderColor: "var(--border-color)" }}>
          <h3 className="text-xl font-bold tracking-[-0.03em] sm:text-2xl" style={{ color: "var(--text-body)" }}>
            {FEATURED_PROJECT.title}
          </h3>
          <p className="max-w-2xl text-sm leading-relaxed sm:text-base" style={{ color: "var(--text-body)", opacity: 0.84 }}>
            An end-to-end LLM workflow that transforms raw input into structured resume content with predictable formatting and better editing ergonomics.
          </p>
        </div>

        <ul className="mb-5 list-disc space-y-2 pl-5" style={{ color: "var(--text-body)", opacity: 0.84 }}>
          {FEATURED_PROJECT.description.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>

        <div className="mb-5 flex flex-wrap gap-2">
          {FEATURED_PROJECT.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs rounded-full font-mono border"
              style={{
                background: "transparent",
                color: "var(--accent-color)",
                borderColor: "var(--border-color)"
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <motion.a
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            href={FEATURED_PROJECT.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-green inline-flex w-full items-center justify-center gap-2 px-5 h-11 rounded-full text-sm font-semibold sm:w-auto"
            style={{
              background: "var(--accent-color)",
              color: "var(--page-bg)",
              boxShadow: "0 12px 24px var(--border-color)",
            }}
          >
            <ExternalLink size={14} />
            Live Demo
          </motion.a>
          <motion.a
            whileHover={{
              scale: 1.02,
              y: -1.5,
              borderColor: "var(--accent-color)",
              color: "var(--accent-color)",
              backgroundColor: "var(--card-bg)",
            }}
            whileTap={{ scale: 0.98 }}
            href={FEATURED_PROJECT.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 px-5 h-11 rounded-full text-sm font-semibold sm:w-auto border"
            style={{
              color: "var(--text-body)",
              borderColor: "var(--border-color)",
              background: "transparent",
            }}
          >
            <Github size={14} />
            View Code
          </motion.a>
        </div>
      </motion.div>
    </GlassSection>
  );
};

export default FeaturedProjectSection;
