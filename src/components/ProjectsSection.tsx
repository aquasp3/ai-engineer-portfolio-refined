import { Github } from "lucide-react";
import { motion } from "framer-motion";
import GlassSection from "./GlassSection";

const projects = [
  {
    title: "Fake News Detection",
    tags: ["NLP", "ML"],
    problem:
      "Classify short-form news text fast enough to support practical misinformation screening.",
    approach:
      "Built an NLP pipeline with TF-IDF features and benchmarked Logistic Regression, SVM, Naive Bayes, and Random Forest to select the most reliable model.",
    impact:
      "Reached 87% accuracy, giving a 12-point lift over a naive baseline and producing a more dependable screening workflow.",
    tech: ["Python", "Scikit-learn", "TF-IDF", "Logistic Regression", "SVM", "Naive Bayes", "Random Forest"],
    github: "https://github.com/aquasp3",
    liveDemo: "https://github.com/aquasp3/ai-engineer-portfolio-refined",
  },
  {
    title: "AQI Prediction",
    tags: ["ML", "Regression"],
    problem:
      "Forecast air-quality trends early enough to support environmental planning and local decision-making.",
    approach:
      "Applied feature engineering, preprocessing, and regression modeling to improve signal quality and reduce noisy predictions.",
    impact:
      "Reached R² = 0.85, improving prediction consistency for multi-day AQI forecasting.",
    tech: ["Python", "Pandas", "NumPy", "Regression", "Feature Engineering"],
    github: "https://github.com/aquasp3",
    liveDemo: "https://github.com/aquasp3/ai-engineer-portfolio-refined",
  },
  {
    title: "Smart Irrigation",
    tags: ["IoT", "Automation"],
    problem:
      "Reduce manual watering while keeping the system responsive to changing soil and sensor conditions.",
    approach:
      "Combined sensor-based triggers with automation logic to control irrigation only when watering was actually needed.",
    impact:
      "Reduced manual intervention by ~60% compared with a fully manual watering routine.",
    tech: ["Arduino", "IoT", "Sensors", "Automation"],
    github: "https://github.com/aquasp3",
    liveDemo: "https://github.com/aquasp3/ai-engineer-portfolio-refined",
  },
  {
    title: "Rule-Based System",
    tags: ["GenAI", "Workflow"],
    problem:
      "Automate structured decisions without requiring constant manual intervention or manual routing.",
    approach:
      "Designed a deterministic rule engine for workflow execution, routing, and repeatable decision paths.",
    impact:
      "Improved consistency across repeated task runs by replacing ad hoc manual decision-making with reusable logic.",
    tech: ["Python", "Rule Engine", "Workflow Logic"],
    github: "https://github.com/aquasp3",
    liveDemo: "https://github.com/aquasp3/ai-engineer-portfolio-refined",
  },
];

const ProjectsSection = () => {
  return (
    <GlassSection id="projects">
      <h2 className="mb-2 text-2xl font-bold sm:text-3xl" style={{ color: "var(--text-body)" }}>
        Projects
      </h2>

      <div className="mb-8 h-1 w-12 rounded-full" style={{ background: "var(--accent-color)", opacity: 0.6 }} />

      <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
        {projects.map((project, i) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, scale: 1.015 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.09, duration: 0.35, ease: "easeOut" }}
            className="elite-card flex h-full flex-col p-5 sm:p-6"
            style={{ boxShadow: "0 10px 22px var(--border-color)" }}
          >
            <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p
                  className="mb-2 text-[10px] font-semibold uppercase tracking-[0.28em]"
                  style={{ color: "var(--secondary-color)" }}
                >
                  Case Study
                </p>
                <h3
                  className="text-lg font-semibold leading-tight"
                  style={{ color: "var(--text-body)" }}
                >
                  {project.title}
                </h3>
              </div>

              <div className="flex flex-wrap justify-end gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]"
                    style={{
                      color: "var(--secondary-color)",
                      borderColor: "var(--border-color)",
                      background: "var(--card-bg)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-b pb-4" style={{ borderColor: "var(--border-color)" }}>
                <p
                  className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em]"
                  style={{ color: "var(--secondary-color)" }}
                >
                  Problem
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-body)", opacity: 0.84 }}>
                  {project.problem}
                </p>
              </div>

              <div className="border-b pb-4" style={{ borderColor: "var(--border-color)" }}>
                <p
                  className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em]"
                  style={{ color: "var(--secondary-color)" }}
                >
                  Solution
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-body)", opacity: 0.84 }}>
                  {project.approach}
                </p>
              </div>

              <div
                className="rounded-2xl border px-4 py-3"
                style={{
                  borderColor: "var(--border-color)",
                  background: "var(--card-bg)",
                }}
              >
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.25em]" style={{ color: "var(--secondary-color)" }}>
                  Key Impact
                </p>
                <p className="text-sm font-medium leading-relaxed" style={{ color: "var(--text-body)" }}>
                  {project.impact}
                </p>
              </div>
            </div>

            <div className="mt-5">
              <p
                className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em]"
                style={{ color: "var(--secondary-color)" }}
              >
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border px-2.5 py-1 text-xs font-mono transition-all duration-200"
                    style={{
                      background: "transparent",
                      color: "var(--accent-color)",
                      borderColor: "var(--border-color)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <motion.a
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full px-4 h-11 text-sm font-medium transition-all duration-300 sm:w-auto"
                style={{
                  background: "var(--accent-color)",
                  color: "var(--page-bg)",
                  boxShadow: "0 12px 24px var(--border-color)",
                }}
              >
                Live Demo
              </motion.a>

              <motion.a
                whileHover={{
                  scale: 1.02,
                  y: -1.5,
                  borderColor: "var(--accent-color)",
                  color: "var(--accent-color)",
                  backgroundColor: "var(--card-bg)",
                }}
                whileTap={{ scale: 0.98 }}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border px-4 h-11 text-sm font-medium transition-all duration-300 sm:w-auto"
                style={{
                  borderColor: "var(--border-color)",
                  color: "var(--text-body)",
                  background: "transparent",
                }}
              >
                <Github size={15} />
                GitHub
              </motion.a>
            </div>
          </motion.article>
        ))}
      </div>
    </GlassSection>
  );
};

export default ProjectsSection;
