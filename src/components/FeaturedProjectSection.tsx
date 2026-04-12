import { Github, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import GlassSection from "./GlassSection";

const FeaturedProjectSection = () => {
  return (
    <GlassSection id="featured">
      <h2 className="text-2xl font-bold mb-1 text-accent-green">Featured Project</h2>
      <div className="w-12 h-1 bg-primary/50 mb-8 rounded-full" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="elite-card rounded-xl p-6 md:p-8 border-primary/60"
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-primary/20 text-primary rounded-full border border-primary/30">
            Completed
          </span>
          <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary rounded-full border border-primary/20">
            GenAI
          </span>
        </div>
        <h3 className="text-xl font-bold text-foreground mb-3">AI Resume Builder</h3>
        <p className="text-muted-foreground leading-relaxed mb-2">
          Built a mobile/web application that generates structured, job-ready resumes using Large Language Models. Implemented prompt design and output formatting for real-world usability.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-5 text-sm">
          Focused on generating clean, professional resumes from minimal user input — demonstrating practical LLM application development.
        </p>
        <div className="flex flex-wrap gap-2 mb-5">
          {["LLMs", "Prompt Engineering", "Python", "React", "LangChain"].map((t) => (
            <span key={t} className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full font-mono border border-primary/20">
              {t}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href="#"
            className="inline-flex items-center gap-2 px-5 h-9 btn-green rounded-full text-xs"
          >
            <ExternalLink size={14} />
            Live Demo
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href="https://github.com/aquasp3"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 h-9 elite-card rounded-full text-xs font-medium text-foreground"
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
