import { motion, useMotionValue, useSpring } from "framer-motion";
import { type ButtonHTMLAttributes, type ReactNode, useRef } from "react";

const MagneticButton = ({ children, className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 280, damping: 22 });
  const y = useSpring(useMotionValue(0), { stiffness: 280, damping: 22 });
  return <motion.button ref={ref} {...props} style={{ x, y }} className={className} onMouseMove={(event) => { const box = ref.current?.getBoundingClientRect(); if (box) { x.set((event.clientX - box.left - box.width / 2) * 0.1); y.set((event.clientY - box.top - box.height / 2) * 0.1); } }} onMouseLeave={() => { x.set(0); y.set(0); }}>{children}</motion.button>;
};

export default MagneticButton;
