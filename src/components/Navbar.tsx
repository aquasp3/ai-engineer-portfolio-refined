import { useEffect, useMemo, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useActiveSection } from "@/hooks/useActiveSection";

const RESUME_PATH = "/Sathvik-Konduri-Resume.pdf";
const navLinks = [
  { label: "About", href: "#about" }, { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" }, { label: "Experience", href: "#experience" },
  { label: "Writing", href: "#blogs" }, { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const ids = useMemo(() => navLinks.map((link) => link.href.slice(1)), []);
  const activeSection = useActiveSection(ids);

  useEffect(() => {
    const dark = (localStorage.getItem("theme") ?? "dark") === "dark";
    document.documentElement.classList.toggle("dark", dark);
    setIsDark(dark);
  }, []);

  const toggleTheme = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  };

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-8">
      <nav className="mx-auto flex max-w-6xl -rotate-1 items-center justify-between border-2 border-[#181818] bg-[#181818] px-4 py-3 text-[#F4F2EC] shadow-[4px_4px_0px_#E12D26] sm:px-6">
        <a href="#top" className="font-display text-lg" onClick={() => setOpen(false)}>SK<span className="text-[#E12D26]">.</span></a>
        <div className="hidden items-center gap-5 md:flex">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className={`min-h-[44px] py-3 text-xs font-bold uppercase tracking-wide transition-colors hover:text-[#E12D26] ${activeSection === link.href.slice(1) ? "text-[#E12D26]" : ""}`}>{link.label}</a>
          ))}
          <a href={RESUME_PATH} target="_blank" rel="noopener noreferrer" className="min-h-[44px] border-2 border-[#F4F2EC] px-3 py-3 text-xs font-bold uppercase tracking-wide hover:bg-[#F4F2EC] hover:text-[#181818]">Resume</a>
          <button onClick={toggleTheme} className="min-h-[44px] p-3" aria-label="Toggle colour theme">{isDark ? <Sun size={16} /> : <Moon size={16} />}</button>
        </div>
        <button onClick={() => setOpen(!open)} className="min-h-[44px] min-w-[44px] md:hidden" aria-label={open ? "Close menu" : "Open menu"}>{open ? <X size={20} /> : <Menu size={20} />}</button>
      </nav>
      {open && <div className="mx-auto mt-2 max-w-6xl border-2 border-[#181818] bg-[var(--surface)] p-4 shadow-[4px_4px_0px_#181818] md:hidden">
        <div className="grid gap-1">{navLinks.map((link) => <a key={link.label} href={link.href} onClick={() => setOpen(false)} className="min-h-[44px] border-b border-[var(--ink)] py-3 text-sm font-bold">{link.label}</a>)}</div>
        <a href={RESUME_PATH} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-[44px] items-center border-2 border-[var(--ink)] px-3 text-sm font-bold">Resume ↗</a>
        <button onClick={toggleTheme} className="mt-2 min-h-[44px] text-sm font-bold">{isDark ? "Switch to light" : "Switch to dark"} mode</button>
      </div>}
    </header>
  );
};

export default Navbar;
