import { motion } from "framer-motion";
import GlassSection from "./GlassSection";

const AboutSection = () => {
  return (
    <GlassSection id="about">
      {/* TITLE */}
      <h2
        className="text-2xl font-bold mb-2"
        style={{ color: "var(--text-body)" }}
      >
        About Me
      </h2>

      <div
        className="w-12 h-1 mb-8 rounded-full"
        style={{ background: "var(--accent-color)", opacity: 0.6 }}
      />

      {/* CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="elite-card p-6 md:p-8 space-y-5"
      >
        {/* PARA 1 */}
        <p
          className="leading-relaxed text-sm md:text-base"
          style={{ color: "var(--text-body)", opacity: 0.85 }}
        >
          I'm an AI/ML engineering student with a strong foundation in{" "}
          <span style={{ color: "var(--accent-color)", fontWeight: 500 }}>
            Machine Learning
          </span>
          ,{" "}
          <span style={{ color: "var(--accent-color)", fontWeight: 500 }}>
            Natural Language Processing
          </span>
          , and{" "}
          <span style={{ color: "var(--secondary-color)", fontWeight: 500 }}>
            Generative AI
          </span>
          . My work focuses on building practical, deployable AI solutions —
          from classification pipelines to LLM-powered applications.
        </p>

        {/* PARA 2 */}
        <p
          className="leading-relaxed text-sm md:text-base"
          style={{ color: "var(--text-body)", opacity: 0.85 }}
        >
          I've built an{" "}
          <span style={{ color: "var(--accent-color)", fontWeight: 500 }}>
            AI Resume Builder
          </span>{" "}
          using LLMs that generates structured, job-ready resumes from user
          input. I also have hands-on experience with{" "}
          <span style={{ color: "var(--accent-color)", fontWeight: 500 }}>
            LangChain
          </span>{" "}
          — working with chains, agents, and memory to build context-aware AI
          applications.
        </p>

        {/* PARA 3 */}
        <p
          className="leading-relaxed text-sm md:text-base"
          style={{ color: "var(--text-body)", opacity: 0.85 }}
        >
          I'm driven by building real-world AI tools that solve genuine problems,
          with measurable results and clean engineering practices.
        </p>
      </motion.div>
    </GlassSection>
  );
};

export default AboutSection;
