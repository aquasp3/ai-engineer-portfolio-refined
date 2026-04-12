import { Github } from "lucide-react";
import { motion } from "framer-motion";
import GlassSection from "./GlassSection";

const projects = [
  {
    title: "Fake News Detection",
    description: "Built a machine learning model to classify fake and real news using NLP techniques. Implemented TF-IDF vectorization and multiple classification algorithms achieving 87% accuracy.",
    tech: ["Python", "Scikit-Learn", "TF-IDF"],
    github: "https://github.com/aquasp3",
  },
  {
    title: "AQI Prediction Model",
    description: "Developed a regression model to predict Air Quality Index using environmental datasets. Feature engineering improved model performance to R² = 0.85.",
    tech: ["Python", "Pandas", "NumPy"],
    github: "https://github.com/aquasp3",
  },
  {
    title: "Smart Irrigation System",
    description: "Designed an automated irrigation system using soil moisture sensors, reducing manual irrigation effort by approximately 60%.",
    tech: ["Arduino", "Sensors"],
    github: "https://github.com/aquasp3",
  },
];

const ProjectsSection = () => {
  return (
    <GlassSection id="projects">
      <h2 className="text-2xl font-bold mb-1 text-accent-green">Selected Projects</h2>
      <div className="w-12 h-1 bg-primary/50 mb-8 rounded-full" />
      <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            className="elite-card rounded-xl p-5 flex flex-col"
          >
            <h3 className="text-base font-semibold text-foreground mb-2">{project.title}</h3>
            <p className="text-sm text-muted-foreground mb-4 flex-1 leading-relaxed">{project.description}</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tech.map((t) => (
                <span key={t} className="px-2.5 py-1 text-xs bg-primary/10 text-primary rounded-full font-mono border border-primary/20">
                  {t}
                </span>
              ))}
            </div>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Github size={15} className="icon-adaptive" />
              View on GitHub
            </a>
          </motion.div>
        ))}
      </div>
    </GlassSection>
  );
};

export default ProjectsSection;
