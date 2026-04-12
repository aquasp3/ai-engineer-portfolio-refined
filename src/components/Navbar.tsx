import { useEffect, useState } from "react";
import { Menu, X, Github, Linkedin, Mail, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Blogs", href: "#blogs" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const handleThemeToggle = () => {
    const root = document.documentElement;
    const nextIsDark = !root.classList.contains("dark");
    root.classList.toggle("dark", nextIsDark);
    localStorage.setItem("theme", nextIsDark ? "dark" : "light");
    setIsDark(nextIsDark);
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl px-2">
      <div
        className="rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between backdrop-blur-md border shadow-[0_10px_30px_rgba(0,0,0,0.22)]"
        style={{ backgroundColor: "rgba(139,161,148,0.1)", borderColor: "rgba(139,161,148,0.2)" }}
      >
        <a href="#" aria-label="Back to top" className="flex items-center gap-3 group">
          <span
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl font-extrabold tracking-wide shadow-[0_0_14px_rgba(79,99,61,0.35)]"
            style={{ backgroundColor: "var(--primary-color)", color: "#FFF7E2" }}
          >
            SK
          </span>
          <span className="hidden sm:block text-sm font-semibold transition-colors group-hover:text-[var(--secondary-color)]" style={{ color: "var(--text)" }}>
            Sathvik Konduri
          </span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm transition-colors hover:text-[var(--secondary-color)]"
              style={{ color: "var(--text)" }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={handleThemeToggle}
            aria-label="Toggle theme"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md hover:-translate-y-0.5"
            style={{ color: "var(--text)", borderColor: "rgba(139,161,148,0.45)", backgroundColor: "rgba(255,247,226,0.05)" }}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a href="https://github.com/aquasp3" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[var(--secondary-color)]" style={{ color: "var(--text)" }}>
            <Github size={18} />
          </a>
          <a href="https://linkedin.com/in/sathvikkonduri" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[var(--secondary-color)]" style={{ color: "var(--text)" }}>
            <Linkedin size={18} />
          </a>
          <a href="mailto:sathvik.konduri@example.com" className="transition-colors hover:text-[var(--secondary-color)]" style={{ color: "var(--text)" }}>
            <Mail size={18} />
          </a>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={handleThemeToggle}
            aria-label="Toggle theme"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md"
            style={{ color: "var(--text)", borderColor: "rgba(139,161,148,0.45)", backgroundColor: "rgba(255,247,226,0.05)" }}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button onClick={() => setOpen(!open)} className="text-[var(--text)]" aria-label="Toggle menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="rounded-2xl mt-2 p-4 md:hidden backdrop-blur-md border shadow-[0_10px_25px_rgba(0,0,0,0.22)]"
            style={{ backgroundColor: "rgba(139,161,148,0.1)", borderColor: "rgba(139,161,148,0.2)" }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-2.5 text-sm transition-colors hover:text-[var(--secondary-color)]"
                style={{ color: "var(--text)" }}
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-4 pt-3 border-t mt-2" style={{ borderColor: "rgba(139,161,148,0.4)" }}>
              <a href="https://github.com/aquasp3" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[var(--secondary-color)]" style={{ color: "var(--text)" }}><Github size={18} /></a>
              <a href="https://linkedin.com/in/sathvikkonduri" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[var(--secondary-color)]" style={{ color: "var(--text)" }}><Linkedin size={18} /></a>
              <a href="mailto:sathvik.konduri@example.com" className="transition-colors hover:text-[var(--secondary-color)]" style={{ color: "var(--text)" }}><Mail size={18} /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
