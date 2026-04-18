import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer
      className="mt-12 px-4 py-12 text-center"
      style={{
        borderTop: "1px solid var(--border-color)",
      }}
    >
      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mb-6">
        <motion.a
          href="https://github.com/aquasp3"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -1, scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 underline-offset-4 decoration-2 transition-all duration-300 hover:underline"
          style={{ color: "var(--accent-color)", opacity: 0.8 }}
        >
          <Github size={24} />
          <span className="font-semibold text-lg hidden sm:inline">GitHub</span>
        </motion.a>
        <motion.a
          href="https://linkedin.com/in/sathvikkonduri"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -1, scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 underline-offset-4 decoration-2 transition-all duration-300 hover:underline"
          style={{ color: "var(--accent-color)", opacity: 0.8 }}
        >
          <Linkedin size={24} />
          <span className="font-semibold text-lg hidden sm:inline">LinkedIn</span>
        </motion.a>
        <motion.a
          href="mailto:sathvikkonduri14@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -1, scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 underline-offset-4 decoration-2 transition-all duration-300 hover:underline"
          style={{ color: "var(--accent-color)", opacity: 0.8 }}
        >
          <Mail size={24} />
          <span className="font-semibold text-lg hidden sm:inline">Email</span>
        </motion.a>
      </div>
      <p
        className="text-sm tracking-wide"
        style={{
          color: "var(--text-body)",
          opacity: 0.6,
        }}
      >
        © {new Date().getFullYear()} Sathvik Konduri. Built with React & Tailwind CSS.
      </p>
    </footer>
  );
};

export default Footer;
