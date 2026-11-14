import { useEffect, useMemo, useState } from "react";
import { Menu, X, Github, Linkedin, Sun, Moon } from "lucide-react";
import { useActiveSection } from "@/hooks/useActiveSection";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Writing", href: "#blogs" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const sectionIds = useMemo(() => navLinks.map((link) => link.href.slice(1)), []);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const dark = saved ? saved === "dark" : true;
    document.documentElement.classList.toggle("dark", dark);
    setIsDark(dark);
  }, []);

  const handleThemeToggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  };

  return (
    <header className="sticky top-0 z-50 border-b" style={{ background: "var(--page-bg)", borderColor: "var(--border-color)" }}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-base font-semibold tracking-tight" style={{ color: "var(--text-body)" }}>
          Sathvik Konduri<span style={{ color: "var(--secondary-color)" }}>.</span>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className={activeSection === link.href.slice(1) ? "nav-link-active text-sm" : "text-sm"} style={{ color: "var(--text-body)" }}>
              {link.label}
            </a>
          ))}
          <a href="https://github.com/aquasp3" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="icon-adaptive"><Github size={17} /></a>
          <a href="https://linkedin.com/in/sathvikkonduri" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="icon-adaptive"><Linkedin size={17} /></a>
          <button onClick={handleThemeToggle} aria-label="Toggle colour theme" className="icon-adaptive rounded-md p-1.5" style={{ border: "1px solid var(--border-color)" }}>
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden" aria-label={open ? "Close menu" : "Open menu"} style={{ color: "var(--text-body)" }}>
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      {open && (
        <div className="border-t px-5 py-3 md:hidden" style={{ borderColor: "var(--border-color)", background: "var(--page-bg)" }}>
          <div className="mx-auto flex max-w-6xl flex-col gap-3">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} onClick={() => setOpen(false)} className="text-sm" style={{ color: "var(--text-body)" }}>{link.label}</a>
            ))}
            <div className="flex items-center gap-5 pt-2">
              <a href="https://github.com/aquasp3" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="icon-adaptive"><Github size={18} /></a>
              <a href="https://linkedin.com/in/sathvikkonduri" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="icon-adaptive"><Linkedin size={18} /></a>
              <button onClick={handleThemeToggle} aria-label="Toggle colour theme" className="icon-adaptive">{isDark ? <Sun size={18} /> : <Moon size={18} />}</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
