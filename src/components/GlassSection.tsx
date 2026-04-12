import { ReactNode } from "react";

interface GlassSectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

const GlassSection = ({ children, id, className = "" }: GlassSectionProps) => {
  return (
    <section id={id} className={`py-16 md:py-24 px-4 sm:px-6 max-w-5xl mx-auto ${className}`}>
      {children}
    </section>
  );
};

export default GlassSection;
