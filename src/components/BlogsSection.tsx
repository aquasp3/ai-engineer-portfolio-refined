import { motion } from "framer-motion";
import GlassSection from "./GlassSection";

const blogs = [
  {
    title: "Python Dictionaries Explained with Real-Life Examples",
    description:
      "A beginner-friendly breakdown of Python dictionaries using real-world analogies to simplify core concepts.",
    platform: "Medium",
    link: "https://medium.com/@sathvikkonduri14/python-dictionaries-explained-with-real-life-examples-beginner-friendly-guide-2683e4989a1a",
  },
  {
    title: "From Raw Text to Meaning: Building a Complete NLP Pipeline",
    description:
      "Step-by-step guide to designing an end-to-end NLP pipeline, from preprocessing to meaningful insights.",
    platform: "Medium",
    link: "https://medium.com/@sathvikkonduri14/from-raw-text-to-meaning-building-a-complete-nlp-pipeline-2393ff3f31cd",
  },
  {
    title: "How Does AI Know ‘Apple’ is a Company and Not a Fruit?",
    description:
      "Exploring how NLP models understand context and resolve ambiguity in real-world language scenarios.",
    platform: "Medium",
    link: "https://medium.com/@sathvikkonduri14/how-does-ai-know-apple-is-a-company-and-not-a-fruit-72848f79a078",
  },
  {
    title: "LangChain: From AI Buzzword to My Favorite Development Framework",
    description:
      "A practical perspective on LangChain and how it enables building real-world LLM-powered applications.",
    platform: "Medium",
    link: "https://medium.com/@sathvikkonduri14/langchain-from-ai-buzzword-to-my-favorite-development-framework-2459e64db4c1",
  },
];

const BlogsSection = () => {
  return (
    <GlassSection id="blogs">
      <div className="mb-8 flex flex-col gap-3">
        <p
          className="text-[10px] font-semibold uppercase tracking-[0.28em]"
          style={{ color: "var(--secondary-color)" }}
        >
          Writing
        </p>
        <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: "var(--text-body)" }}>
          Blogs
        </h2>
        <div
          className="w-12 h-1 rounded-full"
          style={{ background: "var(--accent-color)", opacity: 0.55 }}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 sm:gap-5">
        {blogs.map((blog, i) => (
          <motion.article
            key={blog.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, scale: 1.015 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.35, ease: "easeOut" }}
            className="elite-card flex flex-col rounded-xl p-5 sm:p-6"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <span
                className="rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]"
                style={{
                  background: "var(--card-bg)",
                  color: "var(--secondary-color)",
                  borderColor: "var(--border-color)",
                }}
              >
                {blog.platform}
              </span>
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.22em]"
                style={{ color: "var(--secondary-color)" }}
              >
                Article
              </span>
            </div>

            <h3
              className="text-lg font-semibold leading-tight sm:text-xl"
              style={{ color: "var(--text-body)" }}
            >
              {blog.title}
            </h3>
            <p
              className="mt-3 text-sm leading-relaxed"
              style={{ color: "var(--text-body)", opacity: 0.82 }}
            >
              {blog.description}
            </p>
            <motion.a
              whileTap={{ scale: 0.98 }}
              href={blog.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border px-4 h-11 text-sm font-semibold transition-all duration-300 sm:w-auto"
              style={{
                borderColor: "var(--border-color)",
                color: "var(--text-body)",
                background: "transparent",
              }}
              whileHover={{
                scale: 1.02,
                y: -1.5,
                backgroundColor: "var(--card-bg)",
                borderColor: "var(--accent-color)",
                color: "var(--accent-color)",
              }}
            >
              Read Blog →
            </motion.a>
          </motion.article>
        ))}
      </div>
    </GlassSection>
  );
};

export default BlogsSection;
