const AboutSection = () => (
  <section id="about" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
    <div className="grid gap-8 md:grid-cols-[0.3fr_1fr]">
      <p className="font-mono text-xs text-[var(--accent)]">02 // ABOUT</p>
      <div className="max-w-3xl space-y-5 text-lg leading-8 text-[var(--muted-ink)]">
        <p>I’m an AI/ML engineering student interested in machine learning, natural language processing, and building useful applications with AI.</p>
        <p>My work spans text classification, air-quality prediction, retrieval-augmented generation, backend APIs, and data-driven decision support. I learn by shipping, measuring, and making the next iteration clearer.</p>
      </div>
    </div>
  </section>
);
export default AboutSection;
