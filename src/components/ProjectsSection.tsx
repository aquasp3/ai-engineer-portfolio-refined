import { Github } from "lucide-react";
import { motion } from "framer-motion";
import GlassSection from "./GlassSection";

const projects = [
  {
    title: "Fake News Detection",
    impact:
      "Achieved 87% accuracy with an NLP pipeline using TF-IDF and classic ML models. Evaluated Logistic Regression, SVM, Naive Bayes, and Random Forest to select reliable performance.",
    tech: ["Python", "Scikit-learn", "TF-IDF", "Logistic Regression", "SVM", "Naive Bayes", "Random Forest"],
    github: "https://github.com/aquasp3",
  },
  {
    title: "AQI Prediction",
    impact:
      "Reached R² = 0.85 on air-quality forecasting using regression models. Applied feature engineering and data preparation to improve predictive consistency.",
    tech: ["Python", "Pandas", "NumPy", "Regression", "Feature Engineering"],
    github: "https://github.com/aquasp3",
  },
  {
    title: "Smart Irrigation",
    impact:
      "Reduced manual effort by ~60% through automated irrigation control. Combined sensor-based triggers and logic to enable responsive watering workflows.",
    tech: ["Arduino", "IoT", "Sensors", "Automation"],
    github: "https://github.com/aquasp3",
  },
  {
    title: "Rule-Based System",
    impact:
      "Built a logic-based workflow automation system for structured decision flows. Designed clear rules to support consistent task execution without manual switching.",
    tech: ["Python", "Rule Engine", "Workflow Logic"],
    github: "https://github.com/aquasp3",
  },
];

const ProjectsSection = () => {
  return (
    <GlassSection id="projects">
      <h2 className="text-2xl font-bold mb-1 text-accent-green">Projects</h2>
      <div className="w-12 h-1 bg-primary/50 mb-8 rounded-full" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {projects.map((project, i) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            className="elite-card rounded-xl p-5 flex flex-col"
          >
            <h3 className="text-base font-semibold text-foreground mb-2">{project.title}</h3>
            <p className="text-xs uppercase tracking-wide text-primary/90 mb-2">Tech Stack</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tech.map((tech) => (
                <span key={tech} className="px-2.5 py-1 text-xs bg-primary/10 text-primary rounded-full font-mono border border-primary/20">
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mb-4 flex-1 leading-relaxed">{project.impact}</p>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-4 h-9 rounded-full text-sm border border-primary/30 text-muted-foreground hover:text-primary hover:border-primary/60 transition-colors"
            >
              <Github size={15} />
              GitHub
            </a>
          </motion.article>
        ))}
      </div>
    </GlassSection>
  );
};

export default ProjectsSection;
