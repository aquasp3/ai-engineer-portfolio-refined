import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { lazy, Suspense } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EmbeddingSpaceCanvas from "@/components/EmbeddingSpaceCanvas";
import CommandPalette from "@/components/CommandPalette";
import NotFound from "@/pages/NotFound";
import ErrorBoundary from "@/components/ErrorBoundary";
import RouteMeta from "@/components/RouteMeta";
import ScrollManager from "@/components/ScrollManager";

const HomePage = lazy(() => import("@/pages/HomePage"));
const ProjectsPage = lazy(() => import("@/pages/ProjectsPage"));
const ExperiencePage = lazy(() => import("@/pages/ExperiencePage"));
const SkillsPage = lazy(() => import("@/pages/SkillsPage"));
const BlogsPage = lazy(() => import("@/pages/BlogsPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));

const queryClient = new QueryClient();
const Page = ({ children }: { children: ReactNode }) => <motion.main id="main-content" tabIndex={-1} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.22, ease: "easeOut" }}>{children}</motion.main>;
const RoutedApp = () => { const location = useLocation(); return <div className="relative min-h-screen overflow-x-hidden bg-[var(--page-bg)] text-[var(--ink)]"><EmbeddingSpaceCanvas /><div className="relative z-10"><a href="#main-content" className="skip-link">Skip to content</a><Navbar /><RouteMeta /><ScrollManager /><AnimatePresence mode="wait"><Suspense fallback={<div className="mx-auto flex min-h-[65vh] max-w-6xl items-center justify-center px-5"><p className="font-mono text-xs text-[var(--accent)]">LOADING MODULE...</p></div>}><Routes location={location} key={location.pathname}><Route path="/" element={<Page><HomePage /></Page>} /><Route path="/projects" element={<Page><ProjectsPage /></Page>} /><Route path="/experience" element={<Page><ExperiencePage /></Page>} /><Route path="/skills" element={<Page><SkillsPage /></Page>} /><Route path="/blogs" element={<Page><BlogsPage /></Page>} /><Route path="/contact" element={<Page><ContactPage /></Page>} /><Route path="*" element={<Page><NotFound /></Page>} /></Routes></Suspense></AnimatePresence><Footer /></div><CommandPalette /></div>; };
const App = () => <QueryClientProvider client={queryClient}><TooltipProvider><Toaster /><Sonner /><BrowserRouter><ErrorBoundary><RoutedApp /></ErrorBoundary></BrowserRouter></TooltipProvider></QueryClientProvider>;
export default App;
