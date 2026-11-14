import { Github } from "lucide-react";
import { motion } from "framer-motion";
import GlassSection from "./GlassSection";

const projects = [
  {
    title: "Fake News Detection",
    summary: "A text classification project exploring how machine learning can help identify potentially misleading news.",
    details: "I used TF-IDF to turn text into features, then compared Logistic Regression, SVM, Naive Bayes and Random Forest.",
    result: "Best reported accuracy: 87%.",
    tech: ["Python", "Scikit-learn", "TF-IDF", "NLP"],
  },
  {
    title: "AQI Prediction",
    summary: "A regression project focused on predicting air-quality values from environmental data.",
    details: "The work involved cleaning the data, preparing useful features and testing regression models.",
    result: "Reported R² score: 0.85.",
    tech: ["Python", "Pandas", "NumPy", "Regression"],
  },
  {
    title: "Smart Irrigation",
    summary: "An IoT project that uses sensor readings to make watering less dependent on manual input.",
    details: "The system combines sensor-based triggers with simple automation logic to decide when watering is needed.",
    result: "The project notes an approximately 60% reduction in manual intervention.",
    tech: ["Arduino", "IoT", "Sensors", "Automation"],
  },
  {
    title: "Rule-Based System",
    summary: "A small workflow automation project built around explicit rules and repeatable decisions.",
    details: "I designed rule-based routing so that the same inputs follow consistent paths without manual handling each time.",
    result: "Focused on making repeated tasks more consistent.",
    tech: ["Python", "Rule Engine", "Workflow Logic"],
  },
];

const ProjectsSection = () => (
  <GlassSection id="projects">
    <div className="mb-8 flex flex-col gap-2">
      <p className="text-sm" style={{ color: "var(--secondary-color)" }}>A few things I’ve worked on</p>
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl" style={{ color: "var(--text-body)" }}>Projects</h2>
    </div>

    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {projects.map((project, index) => (
        <motion.article
          key={project.title}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.3, delay: index * 0.04 }}
          className="elite-card flex h-full flex-col p-5 sm:p-6"
        >
          <p className="mb-3 text-xs" style={{ color: "var(--secondary-color)" }}>0{index + 1}</p>
          <h3 className="text-xl font-semibold tracking-tight" style={{ color: "var(--text-body)" }}>{project.title}</h3>
          <p className="mt-3 text-sm leading-7" style={{ color: "var(--text-body)", opacity: 0.86 }}>{project.summary}</p>
          <p className="mt-3 text-sm leading-7" style={{ color: "var(--text-body)", opacity: 0.72 }}>{project.details}</p>
          <p className="mt-4 text-sm font-medium" style={{ color: "var(--accent-color)" }}>{project.result}</p>
          <div className="mt-auto flex flex-wrap gap-2 pt-6">
            {project.tech.map((tech) => (
              <span key={tech} className="rounded-md border px-2.5 py-1 text-xs" style={{ borderColor: "var(--border-color)", color: "var(--secondary-color)" }}>{tech}</span>
            ))}
          </div>
        </motion.article>
      ))}
    </div>

    <a href="https://github.com/aquasp3" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 text-sm font-medium hover:underline" style={{ color: "var(--accent-color)" }}>
      <Github size={16} /> More on GitHub
    </a>
  </GlassSection>
);

export default ProjectsSection;
