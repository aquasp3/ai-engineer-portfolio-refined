import { motion } from "framer-motion";
import GlassSection from "./GlassSection";

const experiences = [
  {
    role: "ML Research Intern",
    company: "Research Lab",
    period: "2024",
    description: "Worked on NLP-based text classification models and contributed to building a data pipeline for preprocessing large-scale datasets.",
  },
  {
    role: "Open Source Contributor",
    company: "GitHub Projects",
    period: "2023 – Present",
    description: "Contributed to open-source ML libraries and tools. Focused on improving documentation and adding utility functions.",
  },
];

const ExperienceSection = () => {
  return (
    <GlassSection id="experience">
      <h2 className="text-2xl font-bold mb-1 text-accent-green">Experience</h2>
      <div className="w-12 h-1 bg-primary/50 mb-8 rounded-full" />
      <div className="space-y-4">
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.role}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            className="elite-card rounded-xl p-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
              <h3 className="text-base font-semibold text-foreground">{exp.role}</h3>
              <span className="text-xs text-primary font-mono">{exp.period}</span>
            </div>
            <p className="text-sm text-primary mb-2 font-medium">{exp.company}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
          </motion.div>
        ))}
      </div>
    </GlassSection>
  );
};

export default ExperienceSection;
