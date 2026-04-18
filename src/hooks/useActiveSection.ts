import { useEffect, useState, useCallback, useRef } from "react";

/**
 * Production-grade scroll spy hook
 * Uses a single IntersectionObserver to track the most visible section
 * @param sectionIds - Array of section IDs to track
 * @param options - IntersectionObserver options
 * @returns The ID of the currently most visible section
 */
export const useActiveSection = (
  sectionIds: string[],
  options?: {
    rootMargin?: string;
    threshold?: number[];
  }
) => {
  const [activeSection, setActiveSection] = useState<string>("");
  const visibilityMapRef = useRef<Map<string, number>>(new Map());

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        visibilityMapRef.current.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
      });

      let mostVisibleId = "";
      let highestRatio = 0;

      visibilityMapRef.current.forEach((ratio, id) => {
        if (ratio > highestRatio) {
          highestRatio = ratio;
          mostVisibleId = id;
        }
      });

      if (mostVisibleId) {
        setActiveSection((prev) => (prev === mostVisibleId ? prev : mostVisibleId));
      }
    },
    []
  );

  useEffect(() => {
    const visibilityMap = visibilityMapRef.current;
    visibilityMap.clear();

    // Get all section elements
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    // Create single IntersectionObserver instance
    const observer = new IntersectionObserver(handleIntersection, {
      // Optimized for sticky navbar at top (~80px)
      // Focuses detection on viewport area below navbar and above bottom
      rootMargin: options?.rootMargin || "-80px 0px -30% 0px",
      // Granular thresholds for smooth tracking
      threshold: options?.threshold || [0, 0.25, 0.5, 0.75, 1],
    });

    // Observe all sections
    sections.forEach((section) => observer.observe(section));

    // Cleanup
    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
      visibilityMap.clear();
    };
  }, [sectionIds, handleIntersection, options]);

  return activeSection;
};
