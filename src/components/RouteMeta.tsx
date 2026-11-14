import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const metadata: Record<string, { title: string; description: string }> = {
  "/": { title: "Sathvik Konduri — AI/ML Engineer", description: "Sathvik Konduri's AI/ML engineering portfolio, projects, experience, skills, and technical writing." },
  "/projects": { title: "Projects — Sathvik Konduri", description: "Verified machine learning, NLP, RAG, FastAPI, and decision-support projects by Sathvik Konduri." },
  "/experience": { title: "Experience — Sathvik Konduri", description: "Machine learning internships and community leadership experience from Sathvik Konduri." },
  "/skills": { title: "Skills — Sathvik Konduri", description: "Sathvik Konduri's programming, AI/ML, backend, data, and tooling skills." },
  "/blogs": { title: "Writing — Sathvik Konduri", description: "Technical writing on NLP pipelines, Generative AI architectures, and Python backend systems." },
  "/contact": { title: "Contact — Sathvik Konduri", description: "Contact Sathvik Konduri for AI/ML projects, collaborations, and conversations." },
};

const upsert = (selector: string, attributes: Record<string, string>, content: string) => {
  let node = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
  if (!node) { node = document.createElement(selector.startsWith("link") ? "link" : "meta") as HTMLMetaElement | HTMLLinkElement; document.head.appendChild(node); }
  Object.entries(attributes).forEach(([key, value]) => node?.setAttribute(key, value));
  if ("content" in node) node.content = content;
};

const RouteMeta = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const info = metadata[pathname] ?? { title: "Page not found — Sathvik Konduri", description: "The requested portfolio page could not be found." };
    document.title = info.title;
    upsert('meta[name="description"]', { name: "description" }, info.description);
    upsert('link[rel="canonical"]', { rel: "canonical", href: `https://sathvikkonduri.vercel.app${pathname}` }, "");
    upsert('meta[property="og:title"]', { property: "og:title" }, info.title);
    upsert('meta[property="og:description"]', { property: "og:description" }, info.description);
    upsert('meta[property="og:url"]', { property: "og:url" }, `https://sathvikkonduri.vercel.app${pathname}`);
    upsert('meta[property="og:image"]', { property: "og:image" }, "https://sathvikkonduri.vercel.app/og.svg");
    upsert('meta[name="twitter:title"]', { name: "twitter:title" }, info.title);
    upsert('meta[name="twitter:description"]', { name: "twitter:description" }, info.description);
    upsert('meta[name="twitter:image"]', { name: "twitter:image" }, "https://sathvikkonduri.vercel.app/og.svg");
  }, [pathname]);
  return null;
};

export default RouteMeta;
