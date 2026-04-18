import { motion } from "framer-motion";
import GlassSection from "./GlassSection";

const skillCategories = [
  {
    title: "AI / ML",
    skills: ["Regression", "Classification", "Feature Engineering", "Model Evaluation"],
  },
  {
    title: "NLP",
    skills: ["TF-IDF", "Text Processing"],
  },
  {
    title: "GenAI",
    skills: ["LangChain (Chains, Agents, Memory)", "LLM Apps"],
  },
  {
    title: "Tools",
    skills: ["Python", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "Git"],
  },
];

const SkillsSection = () => {
  return (
    <GlassSection id="skills">
      {/* TITLE */}
      <h2
        className="text-2xl font-bold mb-2"
        style={{ color: "var(--text-body)" }}
      >
        Skills
      </h2>

      <div
        className="w-12 h-1 mb-8 rounded-full"
        style={{ background: "var(--accent-color)", opacity: 0.6 }}
      />

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {skillCategories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, scale: 1.01 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.35, ease: "easeOut" }}
            className="elite-card p-5"
          >
            {/* CATEGORY TITLE */}
            <h3
              className="text-sm font-semibold mb-3 uppercase tracking-wider"
              style={{ color: "var(--secondary-color)" }}
            >
              {cat.title}
            </h3>

            {/* SKILLS */}
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-xs rounded-full font-mono border"
                  style={{
                    background: "transparent",
                    color: "var(--accent-color)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </GlassSection>
  );
};

export default SkillsSection;
