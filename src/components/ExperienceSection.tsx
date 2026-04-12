import { motion } from "framer-motion";
import GlassSection from "./GlassSection";

const experiences = [
  {
    role: "Machine Learning Intern",
    company: "Industry Experience",
    period: "2024",
    description: "Improved model accuracy by 12% through feature engineering and hyperparameter optimization. Worked on classification and regression problems with real-world datasets.",
  },
  {
    role: "AI-ML Virtual Intern",
    company: "Virtual Internship Program",
    period: "2023",
    description: "Built and evaluated ML models using TensorFlow and Jupyter. Gained hands-on experience with supervised learning workflows, data preprocessing, and model evaluation.",
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
