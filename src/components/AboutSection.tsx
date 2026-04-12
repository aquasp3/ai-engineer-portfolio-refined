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
        className="elite-card rounded-xl p-6 md:p-8"
      >
        <p className="text-muted-foreground leading-relaxed mb-4">
          I'm Sathvik Konduri, an engineering student passionate about Artificial Intelligence and Machine Learning.
          I focus on building practical ML solutions — from NLP pipelines and classification models to real-world
          automation systems.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          My interests span deep learning, natural language processing, and data-driven problem solving.
          I enjoy turning complex datasets into actionable insights and building tools that make a real impact.
        </p>
      </motion.div>
    </GlassSection>
  );
};

export default AboutSection;
