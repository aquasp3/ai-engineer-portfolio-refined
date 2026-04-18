import { useEffect } from "react";
import { motion } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "var(--page-bg)" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div
          className="w-12 h-12 border-2 rounded-full animate-spin mx-auto mb-4"
          style={{
            borderColor: "var(--border-color)",
            borderTopColor: "var(--accent-color)",
          }}
        />
        <p className="text-sm tracking-widest uppercase" style={{ color: "var(--secondary-color)" }}>
          Loading
        </p>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
