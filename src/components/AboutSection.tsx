import { motion } from "framer-motion";
import GlassSection from "./GlassSection";

const AboutSection = () => {
  return (
    <GlassSection id="about">
      <h2 className="text-2xl font-bold mb-1 text-accent-green">About Me</h2>
      <div className="w-12 h-1 bg-primary/50 mb-8 rounded-full" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="elite-card rounded-xl p-6 md:p-8 space-y-4"
      >
        <p className="text-muted-foreground leading-relaxed">
          I'm an AI/ML engineering student with a strong foundation in <span className="text-foreground font-medium">Machine Learning</span>, <span className="text-foreground font-medium">Natural Language Processing</span>, and <span className="text-foreground font-medium">Generative AI</span>. My work focuses on building practical, deployable AI solutions — from classification pipelines to LLM-powered applications.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          I've built an <span className="text-foreground font-medium">AI Resume Builder</span> using LLMs that generates structured, job-ready resumes from user input. I also have hands-on experience with <span className="text-foreground font-medium">LangChain</span> — working with chains, agents, and memory to build context-aware AI applications.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          I'm driven by building real-world AI tools that solve genuine problems, with measurable results and clean engineering practices.
        </p>
      </motion.div>
    </GlassSection>
  );
};

export default AboutSection;
