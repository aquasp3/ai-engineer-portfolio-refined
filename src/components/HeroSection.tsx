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
    <section className="relative min-h-screen flex items-center justify-center">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center px-6 max-w-3xl mx-auto"
      >
        <motion.p variants={item} className="text-sm text-accent-green font-semibold mb-6 tracking-[0.25em] uppercase font-sans">
          Hi, I'm Sathvik Konduri
        </motion.p>
        <motion.h1
          variants={item}
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-accent-green leading-tight"
        >
          Building AI Systems Using Machine Learning & Generative AI
        </motion.h1>
        <motion.p variants={item} className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-12">
          AIML student with hands-on experience in ML, NLP, and LLM-powered applications.
        </motion.p>
        <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-3">
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href="#projects"
            className="inline-flex items-center justify-center gap-2 px-7 h-11 btn-green rounded-full text-sm"
          >
            <ArrowDown size={15} />
            View Projects
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href="https://github.com/aquasp3"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 h-11 elite-card rounded-full text-sm font-medium text-foreground"
          >
            <Github size={15} />
            GitHub
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href="https://linkedin.com/in/sathvikkonduri"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 h-11 elite-card rounded-full text-sm font-medium text-foreground"
          >
            <Linkedin size={15} />
            LinkedIn
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-7 h-11 elite-card rounded-full text-sm font-medium text-foreground"
          >
            <Mail size={15} />
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
        <ChevronDown size={20} className="text-accent-green animate-bounce" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
