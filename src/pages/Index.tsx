import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import FeaturedProjectSection from "@/components/FeaturedProjectSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import BlogsSection from "@/components/BlogsSection";
import CurrentlyLearningSection from "@/components/CurrentlyLearningSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const shouldUseDark = savedTheme ? savedTheme === "dark" : true;
    document.documentElement.classList.toggle("dark", shouldUseDark);

    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "var(--page-bg)", color: "var(--text-body)" }}>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <FeaturedProjectSection />
        <ProjectsSection />
        <ExperienceSection />
        <BlogsSection />
        <CurrentlyLearningSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
