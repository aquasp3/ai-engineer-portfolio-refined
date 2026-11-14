import { useEffect, useState } from "react";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { contact } from "@/data/portfolio";
import MagneticIcon from "./MagneticIcon";

const links = [
  ["/", "Home"], ["/projects", "Projects"], ["/experience", "Experience"],
  ["/skills", "Skills"], ["/blogs", "Writing"], ["/contact", "Contact"],
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  useEffect(() => { const dark = (localStorage.getItem("theme") ?? "dark") === "dark"; document.documentElement.classList.toggle("dark", dark); setIsDark(dark); }, []);
  const toggleTheme = () => { const next = !document.documentElement.classList.contains("dark"); document.documentElement.classList.toggle("dark", next); localStorage.setItem("theme", next ? "dark" : "light"); setIsDark(next); };
  return <header className="sticky top-0 z-50 w-full pt-4"><nav className="w-full border-2 border-[#181818] bg-[#181818] text-[#F4F2EC] shadow-[0_4px_0px_#E12D26]"><div className="layout-shell flex items-center justify-between py-3">
    <NavLink to="/" className="font-display text-lg" onClick={() => setOpen(false)}>SK<span className="text-[#E12D26]">.</span></NavLink>
    <div className="hidden items-center gap-4 md:flex">{links.map(([href, label]) => <NavLink key={href} to={href} end={href === "/"} className={({ isActive }) => `relative min-h-[44px] py-3 text-xs font-bold uppercase tracking-wide hover:text-[#E12D26] ${isActive ? "text-[#E12D26]" : ""}`}>{({ isActive }) => <>{label}{isActive && <span className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#E12D26]" />}</>}</NavLink>)}
      <button onClick={() => window.dispatchEvent(new Event("open-command-palette"))} className="inline-flex min-h-[44px] items-center gap-1 border border-[#F4F2EC] px-2 font-mono text-[10px]" aria-label="Open quick jump"><Search size={13} /> ⌘K</button>
      <a href={contact.resume} download="Sathvik-Konduri-Resume.pdf" className="min-h-[44px] border-2 border-[#F4F2EC] px-3 py-3 text-xs font-bold uppercase tracking-wide hover:bg-[#F4F2EC] hover:text-[#181818]">Resume</a>
      <button onClick={toggleTheme} className="min-h-[44px] p-3" aria-label="Toggle colour theme"><MagneticIcon>{isDark ? <Sun size={16} /> : <Moon size={16} />}</MagneticIcon></button>
    </div>
    <div className="flex items-center gap-1 md:hidden"><button onClick={() => window.dispatchEvent(new Event("open-command-palette"))} className="min-h-[44px] min-w-[44px] p-3" aria-label="Open quick jump"><Search size={18} /></button><button onClick={toggleTheme} className="min-h-[44px] min-w-[44px] p-3" aria-label="Toggle colour theme"><MagneticIcon>{isDark ? <Sun size={18} /> : <Moon size={18} />}</MagneticIcon></button><button onClick={() => setOpen(!open)} className="min-h-[44px] min-w-[44px] p-3" aria-label={open ? "Close menu" : "Open menu"}>{open ? <X size={20} /> : <Menu size={20} />}</button></div>
  </div></nav>
  {open && <div className="layout-shell fixed inset-x-0 top-[76px] z-50 w-full border-2 border-[#181818] bg-[var(--surface)] p-4 shadow-[4px_4px_0px_#181818] md:hidden"><div className="grid gap-1">{links.map(([href, label]) => <NavLink key={href} to={href} end={href === "/"} onClick={() => setOpen(false)} className="min-h-[44px] border-b border-[var(--ink)] py-3 text-sm font-bold">{label}</NavLink>)}</div><button onClick={() => window.dispatchEvent(new Event("open-command-palette"))} className="mt-3 min-h-[44px] font-mono text-xs">⌘K Quick jump</button><a href={contact.resume} download="Sathvik-Konduri-Resume.pdf" className="mt-2 inline-flex min-h-[44px] items-center border-2 border-[var(--ink)] px-3 text-sm font-bold">Resume ↗</a></div>}
  </header>;
};
export default Navbar;
