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
        <motion.p variants={item} className="text-sm text-[#8BA194] font-semibold mb-6 tracking-[0.25em] uppercase font-sans">
          Sathvik Konduri • AI/ML Portfolio
        </motion.p>
        <motion.h1
          variants={item}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-white leading-tight max-w-3xl mx-auto"
        >
          Building AI systems using Machine Learning and <span className="text-[#8BA194]">Generative AI</span>
        </motion.h1>
        <motion.p variants={item} className="text-[#FFF7E2]/90 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-4">
          AIML student with hands-on experience in ML, NLP, and LLM-powered applications.
        </motion.p>
        <motion.p variants={item} className="text-[#8BA194] font-medium text-sm md:text-base mb-10">
          87% Accuracy • R² = 0.85 • ML Intern Experience
        </motion.p>

        <motion.div variants={item} className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-center gap-3 sm:gap-4">
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href="#projects"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-8 h-12 btn-green rounded-full text-sm"
          >
            <ArrowDown size={16} />
            View Projects
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href="https://github.com/aquasp3"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-8 h-12 rounded-full text-sm font-medium border backdrop-blur-md" style={{ color: "#FFF7E2", borderColor: "#8BA194", backgroundColor: "rgba(255,247,226,0.05)" }}
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
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-8 h-12 rounded-full text-sm font-medium border backdrop-blur-md" style={{ color: "#FFF7E2", borderColor: "#8BA194", backgroundColor: "rgba(255,247,226,0.05)" }}
          >
            <Linkedin size={16} />
            LinkedIn
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href="#contact"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-8 h-12 rounded-full text-sm font-medium border backdrop-blur-md" style={{ color: "#FFF7E2", borderColor: "#8BA194", backgroundColor: "rgba(255,247,226,0.05)" }}
          >
            <Mail size={16} />
            Contact
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown size={20} className="text-[#8BA194] animate-bounce" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
