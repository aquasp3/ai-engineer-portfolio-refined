import { useEffect, useMemo, useRef, useState } from "react";
import { Copy, Download, Github, Linkedin, Map, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { contact } from "@/data/portfolio";
import { intentTargetPath, matchIntent, type IntentTarget } from "@/lib/intents";

type PaletteItem = {
  id: string;
  group: "NAVIGATE" | "ACTIONS";
  label: string;
  keywords: string[];
  icon: typeof Map;
  run: () => void;
};

const CommandPalette = () => {
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [feedback, setFeedback] = useState("");
  const isApple = typeof navigator !== "undefined" && /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isTouch = typeof navigator !== "undefined" && navigator.maxTouchPoints > 0;

  const close = () => {
    setOpen(false);
    setQuery("");
    setFeedback("");
    window.setTimeout(() => restoreFocusRef.current?.focus(), 0);
  };
  const openPalette = () => {
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = contact.email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    setFeedback("copied");
    window.setTimeout(() => setFeedback(""), 1200);
    window.setTimeout(() => inputRef.current?.focus(), 600);
  };
  const downloadResume = () => {
    setFeedback("downloading...");
    const link = document.createElement("a");
    link.href = contact.resume;
    link.download = "Sathvik-Konduri-Resume.pdf";
    link.click();
    window.setTimeout(close, 250);
  };
  const openExternal = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
    close();
  };

  const items = useMemo<PaletteItem[]>(() => {
    const navigateItem = (target: IntentTarget, icon = Map): PaletteItem => ({
      id: `navigate-${target}`,
      group: "NAVIGATE",
      label: `navigate('${intentTargetPath[target]}')`,
      keywords: [target, target === "projects" ? "project" : target],
      icon,
      run: () => { navigate(intentTargetPath[target]); close(); },
    });
    return [
      navigateItem("projects"), navigateItem("experience"), navigateItem("skills"),
      navigateItem("blogs"), navigateItem("contact"),
      { id: "navigate-home", group: "NAVIGATE", label: "navigate('/')", keywords: ["home", "index"], icon: Map, run: () => { navigate("/"); close(); } },
      { id: "copy-email", group: "ACTIONS", label: "copy_email()", keywords: ["email", "copy", "contact"], icon: Copy, run: () => { void copyEmail(); } },
      { id: "download-resume", group: "ACTIONS", label: "download_resume()", keywords: ["resume", "cv", "download"], icon: Download, run: downloadResume },
      { id: "open-github", group: "ACTIONS", label: "open_github()", keywords: ["github", "code", "repo"], icon: Github, run: () => openExternal(contact.github) },
      { id: "open-linkedin", group: "ACTIONS", label: "open_linkedin()", keywords: ["linkedin", "profile", "network"], icon: Linkedin, run: () => openExternal(contact.linkedin) },
      { id: "open-medium", group: "ACTIONS", label: "open_medium()", keywords: ["medium", "blog", "writing"], icon: Search, run: () => openExternal(contact.medium) },
    ];
  }, [navigate]);

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return items;
    const intent = matchIntent(value);
    return items.filter((item) => item.label.toLowerCase().includes(value) || item.keywords.some((keyword) => keyword.includes(value)) || (intent && item.id === `navigate-${intent.target}`));
  }, [items, query]);

  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); open ? close() : openPalette(); }
      if (event.key === "Escape" && open) { event.preventDefault(); close(); }
    };
    const eventOpen = () => openPalette();
    window.addEventListener("keydown", key);
    window.addEventListener("open-command-palette", eventOpen);
    return () => { window.removeEventListener("keydown", key); window.removeEventListener("open-command-palette", eventOpen); };
  }, [open]);

  useEffect(() => {
    if (open) { inputRef.current?.focus(); setActive(0); }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const trap = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("button, input, [href]")).filter((node) => !node.hasAttribute("disabled"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", trap);
    return () => window.removeEventListener("keydown", trap);
  }, [open]);

  const runActive = () => filtered[active]?.run();
  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") { event.preventDefault(); setActive((value) => Math.min(value + 1, filtered.length - 1)); }
    if (event.key === "ArrowUp") { event.preventDefault(); setActive((value) => Math.max(value - 1, 0)); }
    if (event.key === "Home") { event.preventDefault(); setActive(0); }
    if (event.key === "End") { event.preventDefault(); setActive(Math.max(filtered.length - 1, 0)); }
    if (event.key === "Enter") { event.preventDefault(); runActive(); }
  };

  const palette = open && <div className="fixed inset-0 z-[70] flex items-start justify-center bg-[#181818]/40 px-4 pt-20 opacity-100 transition-opacity duration-150 sm:pt-24" role="presentation" onClick={close}>
    <div ref={dialogRef} className="w-full max-w-2xl scale-100 border-2 border-[var(--ink)] bg-[var(--surface)] p-3 opacity-100 shadow-[6px_6px_0px_var(--ink)] transition-transform duration-150 sm:p-4" role="dialog" aria-modal="true" aria-labelledby="palette-title" onClick={(event) => event.stopPropagation()}>
      <div className="flex items-center justify-between border-b-2 border-[var(--ink)] px-2 pb-3"><span id="palette-title" className="font-mono text-xs">TOOL CALLS / {isApple ? "⌘K" : "CTRL K"}</span><button onClick={close} aria-label="Close command palette" className="min-h-[44px] min-w-[44px]"><X size={17} className="ml-auto" /></button></div>
      <div className="mt-3 flex items-center gap-2 border-2 border-[var(--ink)] px-3 py-2"><Search size={16} aria-hidden="true" /><input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={onInputKeyDown} data-warp-boost="true" autoComplete="off" placeholder="search tool calls..." aria-label="Search tool calls" className="min-h-[32px] min-w-0 flex-1 bg-transparent font-mono text-sm outline-none" aria-controls="palette-options" aria-activedescendant={filtered[active] ? `palette-option-${filtered[active].id}` : undefined} /></div>
      <div id="palette-options" role="listbox" aria-label="Tool calls" className="mt-3 max-h-[55vh] overflow-y-auto">{filtered.length ? (["NAVIGATE", "ACTIONS"] as const).map((group) => { const groupItems = filtered.filter((item) => item.group === group); return groupItems.length ? <div key={group}><p className="px-3 pb-1 pt-2 font-mono text-[10px] tracking-widest text-[var(--muted-ink)]">{group}</p>{groupItems.map((item) => { const index = filtered.indexOf(item); const Icon = item.icon; return <button id={`palette-option-${item.id}`} key={item.id} role="option" aria-selected={index === active} onMouseEnter={() => setActive(index)} onClick={() => item.run()} className={`flex min-h-[48px] w-full items-center gap-3 border-l-2 px-3 text-left font-mono text-xs transition-colors ${index === active ? "border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_8%,transparent)]" : "border-transparent"} hover:bg-[color-mix(in_srgb,var(--accent)_8%,transparent)]`}><Icon size={15} aria-hidden="true" />{item.label}</button>; })}</div> : null; })) : <p className="px-3 py-8 text-center font-mono text-xs text-[var(--muted-ink)]">no tool matches. try: projects, resume, contact</p>}</div>
      <div className="flex min-h-[32px] items-center justify-between border-t-2 border-[var(--ink)] px-2 pt-3 font-mono text-[10px] text-[var(--muted-ink)]"><span aria-live="polite">{feedback}</span><span>↑↓ move&nbsp;&nbsp; ↵ run&nbsp;&nbsp; esc close</span></div>
    </div>
  </div>;

  return <>{isTouch && <button type="button" onClick={openPalette} className="fixed bottom-5 right-5 z-50 min-h-[48px] border-2 border-[var(--ink)] bg-[var(--surface)] px-4 font-mono text-xs shadow-[3px_3px_0px_var(--ink)]" aria-label="Open tools">tools</button>}{palette}</>;
};

export default CommandPalette;
