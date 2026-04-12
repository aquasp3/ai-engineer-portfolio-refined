import { Github, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import GlassSection from "./GlassSection";

const projects = [
  {
    title: "Fake News Detection",
    metric: "87% accuracy",
    impact:
      "Built an NLP pipeline using TF-IDF with Logistic Regression, SVM, Naive Bayes, and Random Forest. Delivered reliable fake-news classification with strong validation performance.",
    tech: ["Python", "Scikit-learn", "TF-IDF", "Logistic Regression", "SVM", "Naive Bayes", "Random Forest"],
    codeUrl: "https://github.com/aquasp3",
    liveDemo: "#",
  },
  {
    title: "AQI Prediction",
    metric: "R² = 0.85",
    impact:
      "Developed an air-quality regression model with feature engineering and clean preprocessing workflows. Improved predictive consistency for practical AQI forecasting use cases.",
    tech: ["Python", "Pandas", "NumPy", "Regression", "Feature Engineering"],
    codeUrl: "https://github.com/aquasp3",
  },
  {
    title: "Smart Irrigation",
    metric: "60% effort reduction",
    impact:
      "Designed an automation workflow that reduced manual irrigation effort by about 60%. Combined sensor-driven logic and threshold controls for responsive watering cycles.",
    tech: ["Arduino", "IoT", "Sensors", "Automation"],
    codeUrl: "https://github.com/aquasp3",
  },
  {
    title: "Rule-Based System",
    metric: "Logic-driven automation",
    impact:
      "Created a rule-based workflow automation system for predictable decision paths. Enabled consistent execution of repetitive tasks with configurable logical rules.",
    tech: ["Python", "Rule Engine", "Workflow Logic"],
    codeUrl: "https://github.com/aquasp3",
  },
];

const ProjectsSection = () => {
  return (
    <GlassSection id="projects">
      <h2 className="text-2xl font-bold mb-1 text-primary">Projects</h2>
      <div className="w-12 h-1 bg-primary/50 mb-8 rounded-full" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {projects.map((project, i) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            className="rounded-xl p-5 bg-white/5 backdrop-blur-lg border border-white/10 hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(0,0,0,0.25)] flex flex-col h-full"
          >
            <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
            <p className="text-sm font-semibold text-primary mb-3">Metric: {project.metric}</p>
            <p className="text-xs uppercase tracking-wide text-slate-300 mb-2">Tech Stack</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tech.map((tech) => (
                <span key={tech} className="px-2.5 py-1 text-xs bg-primary/10 text-primary rounded-full font-mono border border-primary/20">
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-sm text-slate-200 mb-5 flex-1 leading-relaxed">{project.impact}</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-4 h-10 rounded-full text-sm border border-white/25 text-white hover:border-primary hover:text-primary transition-colors"
              >
                <Github size={15} />
                View Code
              </a>
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-4 h-10 rounded-full text-sm btn-green"
                >
                  <ExternalLink size={15} />
                  Live Demo
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </GlassSection>
  );
};

export default ProjectsSection;
