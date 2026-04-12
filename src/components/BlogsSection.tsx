import { motion } from "framer-motion";
import GlassSection from "./GlassSection";

const blogs = [
  {
    title: "LangChain: Chains, Agents, Memory",
    description:
      "Built applications using chains, agents, and memory to understand LLM workflows.",
    link: "#",
  },
  {
    title: "NLP Token Classification",
    description:
      "Explained NER, POS tagging, and chunking in a simple way.",
    link: "#",
  },
];

const BlogsSection = () => {
  return (
    <GlassSection id="blogs">
      <h2 className="text-2xl font-bold mb-1 text-primary">Blogs</h2>
      <div className="w-12 h-1 bg-primary/50 mb-8 rounded-full" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {blogs.map((blog, i) => (
          <motion.article
            key={blog.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            className="elite-card rounded-xl p-5 sm:p-6 flex flex-col"
          >
            <h3 className="text-lg font-semibold text-white mb-2">{blog.title}</h3>
            <p className="text-sm text-slate-200 mb-5 flex-1 leading-relaxed">
              {blog.description}
            </p>
            <a
              href={blog.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Read Blog →
            </a>
          </motion.article>
        ))}
      </div>
    </GlassSection>
  );
};

export default BlogsSection;
