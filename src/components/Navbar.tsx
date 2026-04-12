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

  // Load saved theme
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
      <div className="elite-nav rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between">

        {/* LOGO */}
        <a href="#" className="flex items-center gap-3 group">
          <span
            className="inline-flex h-12 w-12 items-center justify-center rounded-xl font-extrabold"
            style={{
              backgroundColor: "#4F633D",
              color: "#FFF7E2",
              boxShadow: "0 0 12px rgba(79, 99, 61, 0.4)",
            }}
          >
            SK
          </span>
          <span className="hidden sm:block text-sm font-semibold text-[var(--text-body)]">
            Sathvik Konduri
          </span>
        </a>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-[var(--text-body)] hover:text-[#8BA194] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-3">

          {/* SOCIAL */}
          <a href="https://github.com/aquasp3" target="_blank" rel="noopener noreferrer" className="icon-adaptive">
            <Github size={18} />
          </a>
          <a href="https://linkedin.com/in/sathvikkonduri" target="_blank" rel="noopener noreferrer" className="icon-adaptive">
            <Linkedin size={18} />
          </a>
          <a href="mailto:sathvik.konduri@example.com" className="icon-adaptive">
            <Mail size={18} />
          </a>

          {/* THEME TOGGLE 🔥 */}
          <button
            onClick={handleThemeToggle}
            className="ml-2 p-2 rounded-lg border border-[var(--card-border)] hover:bg-[var(--card-bg)] transition"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-[var(--text-body)]"
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
            className="elite-nav rounded-2xl mt-2 p-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-sm text-[var(--text-body)] hover:text-[#8BA194]"
              >
                {link.label}
              </a>
            ))}

            <div className="flex gap-4 pt-3 mt-2 border-t border-[var(--card-border)]">
              <Github className="icon-adaptive" size={18} />
              <Linkedin className="icon-adaptive" size={18} />
              <Mail className="icon-adaptive" size={18} />

              {/* MOBILE TOGGLE */}
              <button onClick={handleThemeToggle}>
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
