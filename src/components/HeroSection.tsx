import { ArrowDown, Mail, ChevronDown } from "lucide-react";
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
          Hi, I'm
        </motion.p>
        <motion.h1
          variants={item}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-accent-green"
          style={{ letterSpacing: "3px" }}
        >
          SATHVIK KONDURI
        </motion.h1>
        <motion.p variants={item} className="text-lg md:text-xl text-foreground font-medium mb-4 tracking-wide">
          AI / ML Engineering Student
        </motion.p>
        <motion.p variants={item} className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto leading-relaxed mb-12">
          Building intelligent systems with machine learning, NLP, and real-world problem solving.
        </motion.p>
        <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href="#projects"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 h-12 btn-green rounded-full text-sm"
          >
            <ArrowDown size={16} />
            View Projects
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href="#contact"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 h-12 elite-card rounded-full text-sm font-medium text-foreground"
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
        <ChevronDown size={20} className="text-accent-green animate-bounce" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
