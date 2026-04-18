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
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="elite-card p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
      >
        <div className="space-y-5">
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
        </div>

        {/* IMAGE PLACEHOLDER */}
        <div className="flex justify-center md:justify-end">
          <motion.div
            whileHover={{ y: -3, scale: 1.01 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-[300px] overflow-hidden rounded-2xl aspect-[4/5]"
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--border-color)",
            }}
          >
            <div
              className="absolute inset-0 mix-blend-overlay"
              style={{
                background: "linear-gradient(180deg, transparent, var(--page-bg))",
                opacity: 0.25,
              }}
            />
            <div
              className="flex h-full w-full items-center justify-center text-sm"
              style={{ color: "var(--secondary-color)", opacity: 0.6 }}
            >
              [Image Placeholder]
            </div>
          </motion.div>
        </div>
      </motion.div>
    </GlassSection>
  );
};

export default AboutSection;
