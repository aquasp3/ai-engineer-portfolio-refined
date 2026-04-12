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
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-4xl">
      <div className="elite-nav rounded-full px-6 py-3 flex items-center justify-between">
        <a href="#" className="text-lg font-bold text-accent-green font-sans tracking-wide">
          SK
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="https://github.com/aquasp3" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Github size={18} />
          </a>
          <a href="https://linkedin.com/in/sathvikkonduri" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin size={18} />
          </a>
          <a href="mailto:sathvik.konduri@example.com" className="text-muted-foreground hover:text-primary transition-colors">
            <Mail size={18} />
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="elite-nav rounded-2xl mt-2 p-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-4 pt-3 border-t border-border mt-2">
              <a href="https://github.com/aquasp3" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Github size={18} /></a>
              <a href="https://linkedin.com/in/sathvikkonduri" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Linkedin size={18} /></a>
              <a href="mailto:sathvik.konduri@example.com" className="text-muted-foreground hover:text-primary"><Mail size={18} /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
