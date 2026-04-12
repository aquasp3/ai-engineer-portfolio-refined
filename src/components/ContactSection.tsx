import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import GlassSection from "./GlassSection";

const ContactSection = () => {
  return (
    <GlassSection id="contact">
      <h2 className="text-2xl font-bold mb-1 text-accent-green">Get In Touch</h2>
      <div className="w-12 h-1 bg-primary/50 mb-8 rounded-full" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="elite-card rounded-xl p-6 md:p-8 text-center"
      >
        <p className="text-muted-foreground mb-6 max-w-md mx-auto leading-relaxed">
          I'm always open to discussing AI/ML projects, research collaborations, or opportunities.
          Feel free to reach out!
        </p>
        <div className="flex items-center justify-center gap-4">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/aquasp3"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 elite-card rounded-full flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
          >
            <Github size={20} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://linkedin.com/in/sathvikkonduri"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 elite-card rounded-full flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
          >
            <Linkedin size={20} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="mailto:sathvik.konduri@example.com"
            className="w-12 h-12 elite-card rounded-full flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
          >
            <Mail size={20} />
          </motion.a>
        </div>
      </motion.div>
    </GlassSection>
  );
};

export default ContactSection;
