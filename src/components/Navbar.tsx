import { useState } from "react";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
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

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl px-2">
      <div className="rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
        <a href="#" aria-label="Back to top" className="flex items-center gap-3 group">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-extrabold tracking-wide shadow-[0_0_18px_rgba(16,185,129,0.45)]">
            SK
          </span>
          <span className="hidden sm:block text-sm font-semibold text-white group-hover:text-primary transition-colors">
            Sathvik Konduri
          </span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-slate-200 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="https://github.com/aquasp3" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors">
            <Github size={18} />
          </a>
          <a href="https://linkedin.com/in/sathvikkonduri" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors">
            <Linkedin size={18} />
          </a>
          <a href="mailto:sathvik.konduri@example.com" className="text-slate-300 hover:text-white transition-colors">
            <Mail size={18} />
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="rounded-2xl mt-2 p-4 md:hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_10px_25px_rgba(0,0,0,0.25)]"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-2.5 text-sm text-slate-200 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-4 pt-3 border-t border-white/20 mt-2">
              <a href="https://github.com/aquasp3" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white"><Github size={18} /></a>
              <a href="https://linkedin.com/in/sathvikkonduri" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white"><Linkedin size={18} /></a>
              <a href="mailto:sathvik.konduri@example.com" className="text-slate-300 hover:text-white"><Mail size={18} /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
