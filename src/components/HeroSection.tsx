import { ArrowDown, Download, FileText, Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import { motion, Variants } from "framer-motion";

const RESUME_PATH = "/Sathvik-Konduri-Resume.pdf";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.18 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at top, color-mix(in srgb, var(--secondary-color) 18%, transparent), transparent 30%), radial-gradient(circle at 50% 22%, color-mix(in srgb, var(--accent-color) 20%, transparent), transparent 18%), radial-gradient(circle at bottom, color-mix(in srgb, var(--secondary-color) 10%, transparent), transparent 44%)",
        }}
      />
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center"
      >
        <motion.p
          variants={item}
          className="mb-4 inline-flex items-center rounded-full border px-4 py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] backdrop-blur-md"
          style={{
            color: "var(--secondary-color)",
            borderColor: "var(--border-color)",
            background: "var(--card-bg)",
          }}
        >
          Hi, I&apos;m Sathvik Konduri
        </motion.p>

        <div className="relative">
          <div
            className="pointer-events-none absolute inset-x-8 top-2 -z-10 h-24 rounded-full blur-3xl sm:inset-x-16 sm:top-0 sm:h-28"
            style={{
              background: "color-mix(in srgb, var(--secondary-color) 16%, transparent)",
            }}
          />
          <motion.h1
            variants={item}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-[-0.04em]"
            style={{ color: "var(--text-body)" }}
          >
            I engineer AI systems that turn data into{" "}
            <span style={{ color: "var(--secondary-color)" }}>
              measurable products
            </span>
          </motion.h1>
        </div>

        <motion.div
          variants={item}
          className="mt-6 h-px w-20"
          style={{ background: "var(--border-color)" }}
        />

        <motion.p
          variants={item}
          className="mt-6 max-w-2xl text-sm sm:text-base leading-relaxed"
          style={{ color: "var(--text-body)", opacity: 0.82 }}
        >
          Machine learning, generative AI, and LLM workflows shaped for real
          outcomes, with a focus on accuracy, clarity, and product-ready delivery.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-5 grid w-full gap-3 sm:grid-cols-3"
        >
          {[
            { label: "Classification", value: "87% Accuracy" },
            { label: "Regression", value: "R² = 0.85" },
            { label: "Experience", value: "ML Intern" },
          ].map((metric) => (
            <div
              key={metric.label}
              className="elite-card flex flex-col items-center gap-1 rounded-2xl px-4 py-3 text-center"
              style={{ background: "var(--card-bg)" }}
            >
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.22em]"
                style={{ color: "var(--secondary-color)" }}
              >
                {metric.label}
              </span>
              <span className="text-sm font-semibold" style={{ color: "var(--text-body)" }}>
                {metric.value}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.div
          variants={item}
          className="mt-6 sm:mt-10 flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center"
        >
          <motion.a
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            href="#projects"
            className="btn-green inline-flex w-full items-center justify-center gap-2 rounded-full px-5 sm:px-7 h-12 sm:h-11 text-sm font-medium sm:w-auto"
            style={{
              background: "var(--accent-color)",
              color: "var(--page-bg)",
              boxShadow: "0 12px 24px var(--border-color)",
            }}
          >
            <ArrowDown size={16} />
            View Projects
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            href="https://github.com/aquasp3"
            target="_blank"
            rel="noopener noreferrer"
            className="elite-card inline-flex w-full items-center justify-center gap-2 rounded-full px-5 sm:px-7 h-12 sm:h-11 text-sm font-medium sm:w-auto"
            style={{ color: "var(--text-body)" }}
          >
            <Github size={16} />
            GitHub
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            href="https://linkedin.com/in/sathvik-konduri/"
            target="_blank"
            rel="noopener noreferrer"
            className="elite-card inline-flex w-full items-center justify-center gap-2 rounded-full px-5 sm:px-7 h-12 sm:h-11 text-sm font-medium sm:w-auto"
            style={{ color: "var(--text-body)" }}
          >
            <Linkedin size={16} />
            LinkedIn
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            href="#contact"
            className="elite-card inline-flex w-full items-center justify-center gap-2 rounded-full px-5 sm:px-7 h-12 sm:h-11 text-sm font-medium sm:w-auto"
            style={{ color: "var(--text-body)" }}
          >
            <Mail size={16} />
            Contact
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.03, y: -1.5 }}
            whileTap={{ scale: 0.98 }}
            href={RESUME_PATH}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View resume PDF in a new tab"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border px-5 sm:px-7 h-12 sm:h-11 text-sm font-medium transition-all duration-300 sm:w-auto"
            style={{
              borderColor: "var(--border-color)",
              color: "var(--text-body)",
              background: "var(--card-bg)",
            }}
          >
            <FileText size={16} />
            View Resume
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.03, y: -1.5 }}
            whileTap={{ scale: 0.98 }}
            href={RESUME_PATH}
            download="Sathvik-Konduri-Resume.pdf"
            aria-label="Download resume PDF"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border px-5 sm:px-7 h-12 sm:h-11 text-sm font-medium transition-all duration-300 sm:w-auto"
            style={{
              borderColor: "var(--border-color)",
              color: "var(--text-body)",
              background: "transparent",
            }}
          >
            <Download size={16} />
            Download Resume
          </motion.a>
        </motion.div>
      </motion.div>

      {/* SCROLL INDICATOR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.45 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <ChevronDown
          size={20}
          className="animate-bounce"
          style={{ color: "var(--secondary-color)" }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
