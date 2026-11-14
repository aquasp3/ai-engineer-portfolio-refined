import { useEffect, useState } from "react";
import { Copy, Download, Github, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { contact } from "@/data/portfolio";

const CommandPalette = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const key = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setOpen((value) => !value); } };
    const open = () => setOpen(true);
    window.addEventListener("keydown", key); window.addEventListener("open-command-palette", open);
    return () => { window.removeEventListener("keydown", key); window.removeEventListener("open-command-palette", open); };
  }, []);
  const run = (action: () => void) => { action(); setOpen(false); };
  if (!open) return null;
  return <div className="fixed inset-0 z-[70] flex items-start justify-center bg-[#181818]/40 px-4 pt-24" onClick={() => setOpen(false)}><div className="w-full max-w-lg border-2 border-[var(--ink)] bg-[var(--surface)] p-3 shadow-[6px_6px_0px_var(--ink)]" onClick={(event) => event.stopPropagation()}><div className="flex items-center justify-between border-b-2 border-[var(--ink)] px-2 pb-3"><span className="font-mono text-xs">TOOL CALLS / ⌘K</span><button onClick={() => setOpen(false)} aria-label="Close command palette" className="min-h-[44px] min-w-[44px]"><X size={17} className="ml-auto" /></button></div><div className="grid gap-1 pt-2">{[["navigate('/projects')", () => navigate("/projects")], ["copy_email()", async () => { await navigator.clipboard.writeText(contact.email); }], ["open_github()", () => window.open(contact.github, "_blank")], ["download_resume()", () => window.open(contact.resume, "_blank")]].map(([label, action]) => <button key={label as string} onClick={() => run(action as () => void)} className="flex min-h-[48px] items-center gap-3 px-3 text-left font-mono text-xs hover:bg-[var(--ink)] hover:text-[var(--page-bg)]">{label === "copy_email()" ? <Copy size={15} /> : label === "open_github()" ? <Github size={15} /> : <Download size={15} />} {label as string}</button>)}</div></div></div>;
};

export default CommandPalette;
