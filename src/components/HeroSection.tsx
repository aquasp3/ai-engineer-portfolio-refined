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
        <motion.p variants={item} className="text-sm text-accent-green font-semibold mb-6 tracking-[0.25em] uppercase font-sans">
          Hi, I&apos;m Sathvik Konduri
        </motion.p>
        <motion.h1
          variants={item}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-white leading-tight max-w-3xl mx-auto"
        >
          Building AI systems using Machine Learning and Generative AI
        </motion.h1>
        <motion.p variants={item} className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-10">
          AIML student with hands-on experience in ML, NLP, and LLM-powered applications.
        </motion.p>

        <motion.div variants={item} className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-center gap-3">
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href="#projects"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-7 h-11 btn-green rounded-full text-sm"
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
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-7 h-11 elite-card rounded-full text-sm font-medium text-foreground"
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
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-7 h-11 elite-card rounded-full text-sm font-medium text-foreground"
          >
            <Linkedin size={16} />
            LinkedIn
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href="#contact"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-7 h-11 elite-card rounded-full text-sm font-medium text-foreground"
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
        <ChevronDown size={20} className="text-primary animate-bounce" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
