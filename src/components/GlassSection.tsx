import { ReactNode } from "react";
import { motion } from "framer-motion";

interface GlassSectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

const GlassSection = ({ children, id, className = "" }: GlassSectionProps) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={`relative w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24 ${className}`}
    >
      {children}
    </motion.section>
  );
};

export default GlassSection;
