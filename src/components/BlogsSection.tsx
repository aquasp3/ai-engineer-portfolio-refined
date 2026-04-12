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
      <h2 className="text-2xl font-bold mb-1 text-[#8BA194]">Blogs</h2>
      <div className="w-12 h-1 bg-[#8BA194]/70 mb-8 rounded-full" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {blogs.map((blog, i) => (
          <motion.article
            key={blog.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            className="rounded-xl p-5 sm:p-6 backdrop-blur-lg border hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(0,0,0,0.2)] flex flex-col h-full" style={{ backgroundColor: "rgba(255,247,226,0.05)", borderColor: "rgba(139,161,148,0.2)" }}
          >
            <h3 className="text-lg font-semibold text-[#FFF7E2] mb-2">{blog.title}</h3>
            <p className="text-sm text-[#FFF7E2]/90 mb-5 flex-1 leading-relaxed">
              {blog.description}
            </p>
            <a
              href={blog.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#8BA194] hover:text-[#FFF7E2] transition-colors"
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
