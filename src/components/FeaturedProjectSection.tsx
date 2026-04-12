import { Github, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import GlassSection from "./GlassSection";

const FeaturedProjectSection = () => {
  return (
    <GlassSection>
      <h2 className="text-2xl font-bold mb-1 text-accent-green">Featured Project</h2>
      <div className="w-12 h-1 bg-primary/50 mb-8 rounded-full" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="elite-card rounded-xl p-6 md:p-8"
      >
        <h3 className="text-xl font-bold text-foreground mb-3">Fake News Detection System</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          An end-to-end NLP pipeline that classifies news articles as real or fake using TF-IDF vectorization
          and ensemble classification algorithms. Achieved 87% accuracy on benchmark datasets with comprehensive
          evaluation metrics.
        </p>
        <div className="flex flex-wrap gap-2 mb-5">
          {["Python", "Scikit-Learn", "TF-IDF", "NLP", "Pandas"].map((t) => (
            <span key={t} className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full font-mono border border-primary/20">
              {t}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          <a href="https://github.com/aquasp3" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <Github size={16} /> Source Code
          </a>
        </div>
      </motion.div>
    </GlassSection>
  );
};

export default FeaturedProjectSection;
