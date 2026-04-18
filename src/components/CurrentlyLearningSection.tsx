import { motion } from "framer-motion";
import GlassSection from "./GlassSection";

const learningItems = [
  "Improving AI Resume Builder — new features & polished UI",
  "Exploring advanced LangChain concepts (agents, tools, RAG)",
  "Writing technical blogs on ML & Generative AI",
  "Deepening LLM application development skills",
];

const CurrentlyLearningSection = () => {
  return (
    <GlassSection>
      <h2 className="text-2xl font-bold mb-1" style={{ color: "var(--text-body)" }}>Currently Building</h2>
      <div className="w-12 h-1 mb-8 rounded-full" style={{ background: "var(--accent-color)", opacity: 0.5 }} />
      <div className="grid gap-3 sm:grid-cols-2">
        {learningItems.map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.3 }}
            className="elite-card rounded-xl p-4 flex items-center gap-3"
          >
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "var(--accent-color)" }} />
            <span className="text-sm font-medium" style={{ color: "var(--text-body)" }}>{item}</span>
          </motion.div>
        ))}
      </div>
    </GlassSection>
  );
};

export default CurrentlyLearningSection;
