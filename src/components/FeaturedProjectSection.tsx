import { Github } from "lucide-react";
import GlassSection from "./GlassSection";

const FeaturedProjectSection = () => (
  <GlassSection id="featured">
    <div className="mb-8 flex flex-col gap-2">
      <p className="text-sm" style={{ color: "var(--secondary-color)" }}>Something I’ve been working on</p>
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl" style={{ color: "var(--text-body)" }}>AI Resume Builder</h2>
    </div>

    <div className="elite-card max-w-3xl p-5 sm:p-7">
      <p className="text-sm leading-7" style={{ color: "var(--text-body)", opacity: 0.84 }}>
        An application that uses a large language model to turn information
        provided by a user into a structured resume draft. The main focus was
        making the generated content clear and easy to edit.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {["LLMs", "Prompt Engineering", "Python", "React", "LangChain"].map((tech) => (
          <span key={tech} className="rounded-md border px-2.5 py-1 text-xs" style={{ borderColor: "var(--border-color)", color: "var(--secondary-color)" }}>
            {tech}
          </span>
        ))}
      </div>

      <a href="https://github.com/aquasp3" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-medium hover:underline" style={{ color: "var(--accent-color)" }}>
        <Github size={16} /> GitHub profile
      </a>
    </div>
  </GlassSection>
);

export default FeaturedProjectSection;
