import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import LoadingScreen from "@/components/LoadingScreen";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);

  const handleLoadComplete = useCallback(() => setLoading(false), []);

  useEffect(() => {
    // Set dark mode by default
    document.documentElement.classList.add("dark");

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
    <>
      {loading && <LoadingScreen onComplete={handleLoadComplete} />}

      {/* Background Layer */}
      <div className="fixed inset-0 -z-10">
        <AnimatePresence>
          {isDark && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${heroBg})` }}
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.4))" }}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {!isDark && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
              style={{ backgroundColor: "#F8FAFC" }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 min-h-screen"
      >
        <Navbar />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <FeaturedProjectSection />
        <ProjectsSection />
        <ExperienceSection />
        <BlogsSection />
        <CurrentlyLearningSection />
        <ContactSection />
        <Footer />
      </motion.div>
    </>
  );
};

export default Index;
