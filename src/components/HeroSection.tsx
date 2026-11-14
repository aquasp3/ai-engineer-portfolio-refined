import { ArrowDown, Github, Linkedin, Mail, FileText } from "lucide-react";

const RESUME_PATH = "/Sathvik-Konduri-Resume.pdf";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-[88vh] items-center px-5 pb-20 pt-32 sm:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <p className="mb-6 text-sm font-medium" style={{ color: "var(--secondary-color)" }}>
          AI / Machine Learning · Hyderabad, India
        </p>

        <h1
          className="max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl"
          style={{ color: "var(--text-body)" }}
        >
          Hi, I’m Sathvik.
          <span className="block mt-2" style={{ color: "var(--secondary-color)" }}>
            I build things with data and code.
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-base leading-8 sm:text-lg" style={{ color: "var(--text-body)", opacity: 0.78 }}>
          I’m interested in machine learning, NLP and practical AI applications.
          This is where I share the projects I’ve worked on, what I’ve learned,
          and what I’m exploring next.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a href="#projects" className="btn-green inline-flex h-11 items-center gap-2 rounded-md px-5 text-sm">
            <ArrowDown size={16} />
            See my work
          </a>
          <a
            href={RESUME_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-md border px-5 text-sm transition-colors"
            style={{ borderColor: "var(--border-color)", color: "var(--text-body)" }}
          >
            <FileText size={16} />
            Resume
          </a>
        </div>

        <div className="mt-10 flex items-center gap-5 text-sm" style={{ color: "var(--secondary-color)" }}>
          <a className="inline-flex items-center gap-2 hover:underline" href="https://github.com/aquasp3" target="_blank" rel="noopener noreferrer">
            <Github size={17} /> GitHub
          </a>
          <a className="inline-flex items-center gap-2 hover:underline" href="https://linkedin.com/in/sathvik-konduri/" target="_blank" rel="noopener noreferrer">
            <Linkedin size={17} /> LinkedIn
          </a>
          <a className="inline-flex items-center gap-2 hover:underline" href="mailto:sathvikkonduri14@gmail.com">
            <Mail size={17} /> Email
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
