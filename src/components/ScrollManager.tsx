import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const ScrollManager = () => {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();
  const positions = useRef(new Map<string, number>());
  useEffect(() => {
    const save = () => positions.current.set(window.location.pathname, window.scrollY);
    window.addEventListener("scroll", save, { passive: true });
    window.history.scrollRestoration = "manual";
    if (navigationType === "POP") window.scrollTo({ top: positions.current.get(pathname) ?? 0, behavior: "auto" });
    else window.scrollTo({ top: 0, behavior: "auto" });
    return () => { window.removeEventListener("scroll", save); };
  }, [navigationType, pathname]);
  return null;
};

export default ScrollManager;
