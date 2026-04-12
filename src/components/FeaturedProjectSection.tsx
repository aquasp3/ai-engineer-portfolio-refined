import { Github, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import GlassSection from "./GlassSection";

const FEATURED_PROJECT = {
  title: "AI Resume Builder",
  description: [
    "Built AI-powered resume generator using LLMs.",
    "Designed prompt system for structured output.",
    "Generates job-ready resumes from user input.",
  ],
  tech: ["LLMs", "Prompt Engineering", "Python", "React", "LangChain"],
  liveDemo: "#",
  codeUrl: "https://github.com/aquasp3",
};

const FeaturedProjectSection = () => {
  return (
    <GlassSection id="featured">
      <h2 className="text-2xl font-bold mb-1 text-primary">Featured Project</h2>
      <div className="w-12 h-1 bg-primary/50 mb-8 rounded-full" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="rounded-xl p-6 md:p-8 bg-white/5 backdrop-blur-lg border border-white/10 hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(0,0,0,0.25)]"
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-primary/20 text-primary rounded-full border border-primary/30">
            Top Highlight
          </span>
          <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary rounded-full border border-primary/20">
            GenAI
          </span>
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{FEATURED_PROJECT.title}</h3>
        <ul className="list-disc pl-5 space-y-1 text-slate-200 mb-5">
          {FEATURED_PROJECT.description.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 mb-6">
          {FEATURED_PROJECT.tech.map((tech) => (
            <span key={tech} className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full font-mono border border-primary/20">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href={FEATURED_PROJECT.liveDemo}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 h-10 btn-green rounded-full text-sm"
          >
            <ExternalLink size={14} />
            Live Demo
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href={FEATURED_PROJECT.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 h-10 rounded-full text-sm font-medium text-white bg-white/10 backdrop-blur-md border border-white/20"
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
