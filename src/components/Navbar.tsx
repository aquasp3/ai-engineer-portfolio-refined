import { useEffect, useState } from "react";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { contact } from "@/data/portfolio";
import MagneticIcon from "./MagneticIcon";

const links = [
  ["/", "Home"],
  ["/projects", "Projects"],
  ["/experience", "Experience"],
  ["/skills", "Skills"],
  ["/blogs", "Writing"],
  ["/contact", "Contact"],
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
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
    <header className="sticky top-0 z-50 w-full pt-3 sm:pt-4">
      <nav className="w-full border-y-2 border-[#181818] bg-[#181818] text-[#F4F2EC] shadow-[0_4px_0px_#E12D26]">
        <div className="layout-shell flex items-center justify-between py-2.5 sm:py-3">
          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className="font-display inline-flex items-center border-2 border-[#F4F2EC] bg-[#181818] px-2.5 py-1 text-lg tracking-tight shadow-[3px_3px_0px_#E12D26] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#E12D26] active:translate-x-0 active:translate-y-0 active:shadow-none"
          >
            SK<span className="text-[#E12D26]">.</span>
          </NavLink>

          <div className="hidden items-center gap-5 md:flex">
            <div className="flex items-center gap-5">
              {links.map(([href, label]) => (
                <NavLink
                  key={href}
                  to={href}
                  end={href === "/"}
                  className={({ isActive }) =>
                    `group relative inline-flex min-h-[40px] items-center py-2 text-xs font-bold uppercase tracking-wider transition-colors duration-150 hover:text-[#E12D26] ${
                      isActive ? "text-[#E12D26]" : "text-[#F4F2EC]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{label}</span>
                      {isActive ? (
                        <span className="absolute -bottom-0.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#E12D26]" />
                      ) : (
                        <span className="absolute bottom-1 left-0 h-[2px] w-0 bg-[#E12D26] transition-all duration-200 group-hover:w-full" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            <div className="flex items-center gap-2.5 border-l border-[#3A3936] pl-5">
              <button
                onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
                className="inline-flex h-[38px] cursor-pointer items-center gap-1.5 border border-[#F4F2EC]/80 bg-[#222222] px-2.5 font-mono text-[11px] text-[#F4F2EC] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-[#E12D26] hover:text-[#E12D26] hover:shadow-[3px_3px_0px_#E12D26] active:translate-x-0 active:translate-y-0 active:shadow-none"
                aria-label="Open quick jump"
              >
                <Search size={13} />
                <span>⌘K</span>
              </button>

              <a
                href={contact.resume}
                download="Sathvik-Konduri-Resume.pdf"
                className="inline-flex h-[38px] items-center border-2 border-[#F4F2EC] bg-[#181818] px-3.5 text-xs font-bold uppercase tracking-wider text-[#F4F2EC] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-[#E12D26] hover:bg-[#E12D26] hover:text-[#181818] hover:shadow-[3px_3px_0px_#F4F2EC] active:translate-x-0 active:translate-y-0 active:shadow-none"
              >
                Resume
              </a>

              <button
                onClick={toggleTheme}
                className="inline-flex h-[38px] w-[38px] cursor-pointer items-center justify-center border border-[#F4F2EC]/80 bg-[#222222] text-[#F4F2EC] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-[#E12D26] hover:text-[#E12D26] hover:shadow-[3px_3px_0px_#E12D26] active:translate-x-0 active:translate-y-0 active:shadow-none"
                aria-label="Toggle colour theme"
              >
                <MagneticIcon>{isDark ? <Sun size={15} /> : <Moon size={15} />}</MagneticIcon>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
              className="inline-flex h-[40px] w-[40px] items-center justify-center border border-[#F4F2EC]/70 bg-[#222222] text-[#F4F2EC] active:border-[#E12D26] active:text-[#E12D26]"
              aria-label="Open quick jump"
            >
              <Search size={16} />
            </button>
            <button
              onClick={toggleTheme}
              className="inline-flex h-[40px] w-[40px] items-center justify-center border border-[#F4F2EC]/70 bg-[#222222] text-[#F4F2EC] active:border-[#E12D26] active:text-[#E12D26]"
              aria-label="Toggle colour theme"
            >
              <MagneticIcon>{isDark ? <Sun size={16} /> : <Moon size={16} />}</MagneticIcon>
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex h-[40px] w-[40px] items-center justify-center border-2 border-[#F4F2EC] bg-[#181818] text-[#F4F2EC] active:border-[#E12D26] active:text-[#E12D26]"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div className="layout-shell fixed inset-x-0 top-[72px] z-50 w-full border-2 border-[#181818] bg-[var(--surface)] p-4 shadow-[4px_4px_0px_#E12D26] md:hidden">
          <div className="grid gap-1">
            {links.map(([href, label]) => (
              <NavLink
                key={href}
                to={href}
                end={href === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `min-h-[44px] border-b border-[var(--ink)]/20 py-3 text-sm font-bold uppercase tracking-wide transition-colors hover:text-[#E12D26] ${
                    isActive ? "text-[#E12D26]" : ""
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setOpen(false);
                window.dispatchEvent(new Event("open-command-palette"));
              }}
              className="inline-flex min-h-[42px] items-center gap-1.5 border-2 border-[var(--ink)] px-3 font-mono text-xs font-bold"
            >
              <Search size={13} /> ⌘K Quick jump
            </button>
            <a
              href={contact.resume}
              download="Sathvik-Konduri-Resume.pdf"
              className="inline-flex min-h-[42px] items-center border-2 border-[var(--ink)] bg-[#E12D26] px-3.5 text-xs font-bold uppercase tracking-wide text-[#F4F2EC]"
            >
              Resume ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
