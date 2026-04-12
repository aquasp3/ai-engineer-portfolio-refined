import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import GlassSection from "./GlassSection";

const ContactSection = () => {
  return (
    <GlassSection id="contact">
      {/* TITLE */}
      <h2
        className="text-2xl font-bold mb-2"
        style={{ color: "var(--text-body)" }}
      >
        Get In Touch
      </h2>

      <div
        className="w-12 h-1 mb-8 rounded-full"
        style={{ background: "var(--accent-color)", opacity: 0.6 }}
      />

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="elite-card p-6 md:p-8 text-center"
      >
        {/* TEXT */}
        <p
          className="mb-8 max-w-md mx-auto leading-relaxed text-sm md:text-base"
          style={{ color: "var(--text-body)", opacity: 0.8 }}
        >
          I'm always open to discussing AI/ML projects, research collaborations,
          or opportunities. Feel free to reach out!
        </p>

        {/* ICON LINKS */}
        <div className="flex items-center justify-center gap-4">
          <motion.a
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/aquasp3"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 elite-card rounded-full flex items-center justify-center transition-all duration-200"
            style={{ color: "var(--text-body)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--accent-color)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-body)";
            }}
          >
            <Github size={20} />
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            href="https://www.linkedin.com/in/sathvik-konduri/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 elite-card rounded-full flex items-center justify-center transition-all duration-200"
            style={{ color: "var(--text-body)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--accent-color)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-body)";
            }}
          >
            <Linkedin size={20} />
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            href="mailto:sathvikkonduri14@gmail.com"
            className="w-12 h-12 elite-card rounded-full flex items-center justify-center transition-all duration-200"
            style={{ color: "var(--text-body)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--accent-color)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-body)";
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
