import { motion, useMotionValue, useSpring } from "framer-motion";
import { type ReactNode, useRef } from "react";

const MagneticIcon = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });
  const y = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });
  return <motion.span ref={ref} style={{ x, y }} className={`relative inline-flex ${className}`} onMouseMove={(event) => { const box = ref.current?.getBoundingClientRect(); if (box) { x.set((event.clientX - box.left - box.width / 2) * 0.2); y.set((event.clientY - box.top - box.height / 2) * 0.2); } }} onMouseLeave={() => { x.set(0); y.set(0); }}>{children}<span className="absolute -right-1 -top-1 h-1.5 w-1.5 rounded-full bg-[var(--accent)] opacity-0 transition-opacity group-hover:opacity-100" /></motion.span>;
};

export default MagneticIcon;
