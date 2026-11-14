import { BookOpen, Check, Copy, Github, Linkedin, Mail } from "lucide-react";
import { useState } from "react";

const email = "sathvikkonduri14@gmail.com";
const ContactSection = () => {
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => { await navigator.clipboard.writeText(email); setCopied(true); window.setTimeout(() => setCopied(false), 1800); };
  return <section id="contact" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24"><div className="ink-box grid gap-8 p-6 sm:p-10 md:grid-cols-[1fr_auto] md:items-end"><div><p className="font-mono text-xs text-[var(--accent)]">08 // CONTACT</p><h2 className="font-display mt-3 text-4xl sm:text-6xl">Let’s make<br />something useful.</h2><p className="mt-5 max-w-xl leading-7 text-[var(--muted-ink)]">Open to AI/ML projects, research collaborations, and thoughtful conversations about building with data.</p></div><div className="flex flex-col gap-3"><button onClick={copyEmail} className="ink-btn-primary px-4">{copied ? <Check size={17} /> : <Copy size={17} />} {copied ? "Copied" : "Copy email"}</button><a href={`mailto:${email}`} className="ink-btn-secondary px-4"><Mail size={17} /> Email me</a><div className="flex gap-2"><a href="https://www.linkedin.com/in/sathvik-konduri" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="ink-btn-secondary min-w-[44px] px-3"><Linkedin size={18} /></a><a href="https://github.com/aquasp3" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="ink-btn-secondary min-w-[44px] px-3"><Github size={18} /></a><a href="https://medium.com/@sathvikkonduri14" target="_blank" rel="noopener noreferrer" aria-label="Medium" className="ink-btn-secondary min-w-[44px] px-3"><BookOpen size={18} /></a></div></div></div></section>;
};
export default ContactSection;
