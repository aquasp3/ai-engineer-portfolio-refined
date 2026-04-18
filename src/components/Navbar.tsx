import { useEffect, useMemo, useState } from "react";
import { Menu, X, Github, Linkedin, Mail, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useActiveSection } from "@/hooks/useActiveSection";

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

  // Use production-grade scroll spy hook
  const sectionIds = useMemo(
    () => navLinks.map((link) => link.href.replace("#", "")),
    []
  );
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  // Toggle theme
  const handleThemeToggle = () => {
    const root = document.documentElement;
    const nextIsDark = !root.classList.contains("dark");

    root.classList.toggle("dark", nextIsDark);
    localStorage.setItem("theme", nextIsDark ? "dark" : "light");
    setIsDark(nextIsDark);
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl px-2">
      <div className="elite-nav flex items-center justify-between rounded-2xl px-4 py-3 sm:px-6">

        {/* LOGO */}
        <a 
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-3 group"
        >
          <span
            className="inline-flex h-12 w-12 items-center justify-center rounded-xl font-extrabold"
            style={{
              background: "var(--accent-color)",
              color: "var(--page-bg)",
              boxShadow: "0 0 12px rgba(79, 99, 61, 0.3)",
            }}
          >
            SK
          </span>
          <span
            className="hidden sm:block text-sm font-semibold"
            style={{ color: "var(--text-body)" }}
          >
            Sathvik Konduri
          </span>
        </a>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              className={`text-sm transition-colors ${activeSection === link.href.slice(1) ? "nav-link-active" : ""}`}
              style={{ color: "var(--text-body)" }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-3">

          {/* SOCIAL */}
          <motion.a
            href="https://github.com/aquasp3"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-adaptive"
            whileHover={{ scale: 1.08, y: -1 }}
            whileTap={{ scale: 0.96 }}
          >
            <Github size={18} />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/sathvikkonduri"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-adaptive"
            whileHover={{ scale: 1.08, y: -1 }}
            whileTap={{ scale: 0.96 }}
          >
            <Linkedin size={18} />
          </motion.a>
          <motion.a
            href="mailto:sathvikkonduri14@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-adaptive"
            whileHover={{ scale: 1.08, y: -1 }}
            whileTap={{ scale: 0.96 }}
          >
            <Mail size={18} />
          </motion.a>

          {/* THEME TOGGLE */}
          <button
            onClick={handleThemeToggle}
            className="ml-2 rounded-lg p-2 transition-all duration-200"
            style={{
              border: "1px solid var(--border-color)",
              color: "var(--text-body)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--card-bg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
          style={{ color: "var(--text-body)" }}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="elite-nav mt-2 rounded-2xl p-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block py-2 text-sm transition-colors ${activeSection === link.href.slice(1) ? "nav-link-active" : ""}`}
                style={{ color: "var(--text-body)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--secondary-color)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-body)";
                }}
              >
                {link.label}
              </a>
            ))}

            <div
              className="mt-2 flex gap-4 border-t pt-3"
              style={{ borderColor: "var(--border-color)" }}
            >
              <motion.a
                href="https://github.com/aquasp3"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-adaptive"
                whileHover={{ scale: 1.08, y: -1 }}
                whileTap={{ scale: 0.96 }}
              >
                <Github size={18} />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/sathvikkonduri"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-adaptive"
                whileHover={{ scale: 1.08, y: -1 }}
                whileTap={{ scale: 0.96 }}
              >
                <Linkedin size={18} />
              </motion.a>
              <motion.a
                href="mailto:sathvikkonduri14@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-adaptive"
                whileHover={{ scale: 1.08, y: -1 }}
                whileTap={{ scale: 0.96 }}
              >
                <Mail size={18} />
              </motion.a>

              {/* MOBILE TOGGLE */}
              <button
                onClick={handleThemeToggle}
                className="ml-auto"
                style={{ color: "var(--text-body)" }}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
