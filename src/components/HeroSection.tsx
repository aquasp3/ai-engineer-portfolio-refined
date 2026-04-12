import { ArrowDown, Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import { motion, Variants } from "framer-motion";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center w-full max-w-3xl mx-auto"
      >
        {/* NAME */}
        <motion.p
          variants={item}
          className="text-xs sm:text-sm font-semibold mb-5 tracking-[0.25em] uppercase"
          style={{ color: "var(--accent-color)" }}
        >
          Hi, I&apos;m Sathvik Konduri
        </motion.p>

        {/* HEADLINE */}
        <motion.h1
          variants={item}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight"
          style={{ color: "var(--text-body)" }}
        >
          Building AI systems using Machine Learning and{" "}
          <span style={{ color: "var(--secondary-color)" }}>
            Generative AI
          </span>
        </motion.h1>

        {/* DESCRIPTION */}
        <motion.p
          variants={item}
          className="text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-6"
          style={{ color: "var(--text-body)", opacity: 0.8 }}
        >
          AIML student with hands-on experience in ML, NLP, and LLM-powered
          applications.
        </motion.p>

        {/* METRICS */}
        <motion.p
          variants={item}
          className="text-xs md:text-sm mb-10 font-medium"
          style={{ color: "var(--secondary-color)" }}
        >
          87% Accuracy • R² = 0.85 • ML Intern Experience
        </motion.p>

        {/* BUTTONS */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-center gap-3"
        >
          {/* PRIMARY CTA */}
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href="#projects"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-7 h-11 rounded-full text-sm font-medium"
            style={{
              background: "var(--accent-color)",
              color: "#FFF7E2",
            }}
          >
            <ArrowDown size={16} />
            View Projects
          </motion.a>

          {/* SECONDARY BUTTONS */}
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href="https://github.com/aquasp3"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-7 h-11 elite-card rounded-full text-sm font-medium"
            style={{ color: "var(--text-body)" }}
          >
            <Github size={16} />
            GitHub
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href="https://linkedin.com/in/sathvikkonduri"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-7 h-11 elite-card rounded-full text-sm font-medium"
            style={{ color: "var(--text-body)" }}
          >
            <Linkedin size={16} />
            LinkedIn
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href="#contact"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-7 h-11 elite-card rounded-full text-sm font-medium"
            style={{ color: "var(--text-body)" }}
          >
            <Mail size={16} />
            Contact
          </motion.a>
        </motion.div>
      </motion.div>

      {/* SCROLL INDICATOR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
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
