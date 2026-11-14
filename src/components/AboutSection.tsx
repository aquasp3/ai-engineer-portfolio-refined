import GlassSection from "./GlassSection";

const AboutSection = () => (
  <GlassSection id="about">
    <div className="mb-8 flex flex-col gap-2">
      <p className="text-sm" style={{ color: "var(--secondary-color)" }}>A little about me</p>
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl" style={{ color: "var(--text-body)" }}>About</h2>
    </div>

    <div className="max-w-3xl space-y-5 text-base leading-8" style={{ color: "var(--text-body)", opacity: 0.84 }}>
      <p>
        I’m an AI/ML engineering student interested in machine learning,
        natural language processing and building useful applications with AI.
        I enjoy understanding how things work, trying different approaches and
        learning from the results.
      </p>
      <p>
        I’ve worked on projects involving text classification, air-quality
        prediction, IoT automation and LLM-based applications. I’m continuing
        to build my skills through hands-on work and experimentation.
      </p>
    </div>
  </GlassSection>
);

export default AboutSection;
