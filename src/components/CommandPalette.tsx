import { useEffect, useRef, useState } from "react";
import { Copy, Download, Github, Linkedin, Map, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { contact } from "@/data/portfolio";
import { intentTargetPath } from "@/lib/intentRouter";

const CommandPalette = () => {
  const navigate = useNavigate();
  const firstAction = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setOpen((value) => !value); }
      if (event.key === "Escape") setOpen(false);
    };
    const openPalette = () => setOpen(true);
    window.addEventListener("keydown", key); window.addEventListener("open-command-palette", openPalette);
    return () => { window.removeEventListener("keydown", key); window.removeEventListener("open-command-palette", openPalette); };
  }, []);
  useEffect(() => { if (open) firstAction.current?.focus(); }, [open]);
  const run = (action: () => void) => { action(); setOpen(false); };
  if (!open) return null;
  return <div className="fixed inset-0 z-[70] flex items-start justify-center bg-[#181818]/40 px-4 pt-24" role="presentation" onClick={() => setOpen(false)}><div className="w-full max-w-lg border-2 border-[var(--ink)] bg-[var(--surface)] p-3 shadow-[6px_6px_0px_var(--ink)]" role="dialog" aria-modal="true" aria-labelledby="palette-title" onClick={(event) => event.stopPropagation()}><div className="flex items-center justify-between border-b-2 border-[var(--ink)] px-2 pb-3"><span id="palette-title" className="font-mono text-xs">TOOL CALLS / ⌘K</span><button onClick={() => setOpen(false)} aria-label="Close command palette" className="min-h-[44px] min-w-[44px]"><X size={17} className="ml-auto" /></button></div><div className="grid gap-1 pt-2"><button ref={firstAction} onClick={() => run(() => navigate(intentTargetPath.projects))} className="flex min-h-[48px] items-center gap-3 px-3 text-left font-mono text-xs hover:bg-[var(--ink)] hover:text-[var(--page-bg)]"><Map size={15} /> navigate('/projects')</button><button onClick={() => run(async () => { await navigator.clipboard.writeText(contact.email); })} className="flex min-h-[48px] items-center gap-3 px-3 text-left font-mono text-xs hover:bg-[var(--ink)] hover:text-[var(--page-bg)]"><Copy size={15} /> copy_email()</button><a href={contact.github} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="flex min-h-[48px] items-center gap-3 px-3 text-left font-mono text-xs hover:bg-[var(--ink)] hover:text-[var(--page-bg)]"><Github size={15} /> open_github()</a><a href={contact.linkedin} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="flex min-h-[48px] items-center gap-3 px-3 text-left font-mono text-xs hover:bg-[var(--ink)] hover:text-[var(--page-bg)]"><Linkedin size={15} /> open_linkedin()</a><a href={contact.resume} download="Sathvik-Konduri-Resume.pdf" onClick={() => setOpen(false)} className="flex min-h-[48px] items-center gap-3 px-3 text-left font-mono text-xs hover:bg-[var(--ink)] hover:text-[var(--page-bg)]"><Download size={15} /> download_resume()</a></div></div></div>;
};

export default CommandPalette;
