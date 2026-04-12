import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import GlassSection from "./GlassSection";

const blogs = [
  {
    title: "LangChain: Chains, Agents, Memory",
    description:
      "A deep dive into LangChain's core building blocks — how chains orchestrate LLM calls, agents make decisions dynamically, and memory enables context-aware conversations.",
    link: "#",
  },
  {
    title: "NLP Token Classification: NER, POS & Chunking",
    description:
      "Understanding token-level NLP tasks — Named Entity Recognition, Part-of-Speech tagging, and text chunking with transformer-based models.",
    link: "#",
  },
];

const BlogsSection = () => {
  return (
    <GlassSection id="blogs">
      <h2 className="text-2xl font-bold mb-1 text-accent-green">Blogs</h2>
      <div className="w-12 h-1 bg-primary/50 mb-8 rounded-full" />
      <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
        {blogs.map((blog, i) => (
          <motion.div
            key={blog.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            className="elite-card rounded-xl p-5 flex flex-col"
          >
            <h3 className="text-base font-semibold text-foreground mb-2">{blog.title}</h3>
            <p className="text-sm text-muted-foreground mb-4 flex-1 leading-relaxed">
              {blog.description}
            </p>
            <a
              href={blog.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline transition-colors"
            >
              Read Blog <ExternalLink size={14} />
            </a>
          </motion.div>
        ))}
      </div>
    </GlassSection>
  );
};

export default BlogsSection;
