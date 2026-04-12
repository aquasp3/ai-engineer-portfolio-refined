import { ReactNode } from "react";

interface GlassSectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

const GlassSection = ({ children, id, className = "" }: GlassSectionProps) => {
  return (
    <section
      id={id}
      className={`relative w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-24 ${className}`}
    >
      {children}
    </section>
  );
};

export default GlassSection;
