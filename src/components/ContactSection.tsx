import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import GlassSection from "./GlassSection";

const ContactSection = () => {
  return (
    <GlassSection id="contact">
      <h2 className="mb-2 text-2xl font-bold sm:text-3xl" style={{ color: "var(--text-body)" }}>
        Get In Touch
      </h2>

      <div className="w-12 h-1 mb-8 rounded-full" style={{ background: "var(--accent-color)", opacity: 0.6 }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -3 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="elite-card p-5 sm:p-6 md:p-8 text-center"
      >
        <p
          className="mb-6 sm:mb-8 max-w-md px-2 sm:px-0 mx-auto leading-relaxed text-sm md:text-base"
          style={{ color: "var(--text-body)", opacity: 0.84 }}
        >
          I'm always open to discussing AI/ML projects, research collaborations,
          or opportunities. Feel free to reach out!
        </p>

        <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
          <motion.a
            whileHover={{
              scale: 1.06,
              y: -1.5,
              color: "var(--accent-color)",
              borderColor: "var(--accent-color)",
              backgroundColor: "var(--card-bg)",
            }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/aquasp3"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-200"
            style={{
              color: "var(--text-body)",
              borderColor: "var(--border-color)",
              background: "var(--card-bg)",
            }}
          >
            <Github size={20} />
          </motion.a>

          <motion.a
            whileHover={{
              scale: 1.06,
              y: -1.5,
              color: "var(--accent-color)",
              borderColor: "var(--accent-color)",
              backgroundColor: "var(--card-bg)",
            }}
            whileTap={{ scale: 0.95 }}
            href="https://linkedin.com/in/sathvik-konduri/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-200"
            style={{
              color: "var(--text-body)",
              borderColor: "var(--border-color)",
              background: "var(--card-bg)",
            }}
          >
            <Linkedin size={20} />
          </motion.a>

          <motion.a
            whileHover={{
              scale: 1.06,
              y: -1.5,
              color: "var(--accent-color)",
              borderColor: "var(--accent-color)",
              backgroundColor: "var(--card-bg)",
            }}
            whileTap={{ scale: 0.95 }}
            href="mailto:sathvikkonduri14@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-200"
            style={{
              color: "var(--text-body)",
              borderColor: "var(--border-color)",
              background: "var(--card-bg)",
            }}
          >
            <Mail size={20} />
          </motion.a>
        </div>
      </motion.div>
    </GlassSection>
  );
};

export default ContactSection;
