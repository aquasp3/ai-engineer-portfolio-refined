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
      {/* SECTION TITLE */}
      <h2
        className="text-2xl font-bold mb-2"
        style={{ color: "var(--text-body)" }}
      >
        Projects
      </h2>

      <div
        className="w-12 h-1 mb-8 rounded-full"
        style={{ background: "var(--accent-color)", opacity: 0.6 }}
      />

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {projects.map((project, i) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            className="elite-card p-5 flex flex-col h-full transition-all duration-300 hover:-translate-y-1"
          >
            {/* TITLE */}
            <h3
              className="text-base font-semibold mb-3"
              style={{ color: "var(--text-body)" }}
            >
              {project.title}
            </h3>

            {/* TECH STACK */}
            <p
              className="text-xs uppercase tracking-wide mb-2"
              style={{ color: "var(--secondary-color)" }}
            >
              Tech Stack
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs rounded-full font-mono border"
                  style={{
                    background: "rgba(79, 99, 61, 0.1)",
                    color: "var(--accent-color)",
                    borderColor: "rgba(79, 99, 61, 0.2)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* DESCRIPTION */}
            <p
              className="text-sm mb-5 flex-1 leading-relaxed"
              style={{ color: "var(--text-body)", opacity: 0.8 }}
            >
              {project.impact}
            </p>

            {/* BUTTON */}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-4 h-9 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                border: "1px solid var(--border-color)",
                color: "var(--text-body)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent-color)";
                e.currentTarget.style.color = "var(--accent-color)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-color)";
                e.currentTarget.style.color = "var(--text-body)";
              }}
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
