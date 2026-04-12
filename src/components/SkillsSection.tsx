import { motion } from "framer-motion";
import GlassSection from "./GlassSection";

const skillCategories = [
  {
    title: "Languages",
    skills: ["Python", "C++", "JavaScript", "SQL"],
  },
  {
    title: "ML / AI",
    skills: ["Scikit-Learn", "TensorFlow", "PyTorch", "LangChain", "Hugging Face"],
  },
  {
    title: "Data & Tools",
    skills: ["Pandas", "NumPy", "Matplotlib", "Jupyter", "Git"],
  },
  {
    title: "Web & Cloud",
    skills: ["React", "Tailwind CSS", "Node.js", "Firebase"],
  },
];

const SkillsSection = () => {
  return (
    <GlassSection id="skills">
      <h2 className="text-2xl font-bold mb-1 text-accent-green">Skills</h2>
      <div className="w-12 h-1 bg-primary/50 mb-8 rounded-full" />
      <div className="grid gap-4 sm:grid-cols-2">
        {skillCategories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            className="elite-card rounded-xl p-5"
          >
            <h3 className="text-sm font-semibold text-accent-green mb-3 uppercase tracking-wider">{cat.title}</h3>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((s) => (
                <span key={s} className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full font-mono border border-primary/20">
                  {s}
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
