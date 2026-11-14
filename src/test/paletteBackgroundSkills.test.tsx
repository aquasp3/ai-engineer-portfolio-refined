import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CommandPalette from "@/components/CommandPalette";
import EmbeddingSpaceCanvas from "@/components/EmbeddingSpaceCanvas";
import SkillsPage from "@/pages/SkillsPage";

const navigateMock = vi.hoisted(() => vi.fn());
vi.mock("react-router-dom", () => ({ useNavigate: () => navigateMock, useLocation: () => ({ pathname: "/" }) }));

const context = {
  clearRect: vi.fn(), setTransform: vi.fn(), beginPath: vi.fn(), moveTo: vi.fn(), lineTo: vi.fn(),
  stroke: vi.fn(), save: vi.fn(), restore: vi.fn(), translate: vi.fn(), rotate: vi.fn(),
  quadraticCurveTo: vi.fn(), fill: vi.fn(), arc: vi.fn(),
} as unknown as CanvasRenderingContext2D;

describe("palette, warp background, and skills UX", () => {
  const defaultMatchMedia = window.matchMedia;
  const defaultGetContext = HTMLCanvasElement.prototype.getContext;

  beforeEach(() => {
    navigateMock.mockReset();
    window.matchMedia = ((query: string) => ({ matches: false, media: query, onchange: null, addListener: vi.fn(), removeListener: vi.fn(), addEventListener: vi.fn(), removeEventListener: vi.fn(), dispatchEvent: vi.fn() })) as typeof window.matchMedia;
    HTMLCanvasElement.prototype.getContext = vi.fn(() => context);
    vi.stubGlobal("IntersectionObserver", class {
      observe() {}
      disconnect() {}
    });
  });

  afterEach(() => {
    window.matchMedia = defaultMatchMedia;
    HTMLCanvasElement.prototype.getContext = defaultGetContext;
    vi.restoreAllMocks();
  });

  it("opens with Ctrl/Cmd+K and closes with Escape", () => {
    render(<CommandPalette />);
    fireEvent.keyDown(window, { key: "k", ctrlKey: true });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("filters by keywords and resolves typo matches", () => {
    render(<CommandPalette />);
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    fireEvent.change(screen.getByPlaceholderText("search tool calls..."), { target: { value: "projecs" } });
    expect(screen.getByRole("option", { name: /navigate\('\/projects'\)/ })).toBeInTheDocument();
  });

  it("moves with arrows and runs the active row with Enter", () => {
    render(<CommandPalette />);
    fireEvent.keyDown(window, { key: "k", ctrlKey: true });
    const input = screen.getByPlaceholderText("search tool calls...");
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(navigateMock).toHaveBeenCalledWith("/experience");
  });

  it("shows copy feedback without immediately closing", async () => {
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: vi.fn().mockResolvedValue(undefined) } });
    render(<CommandPalette />);
    fireEvent.keyDown(window, { key: "k", ctrlKey: true });
    fireEvent.click(screen.getByRole("option", { name: "copy_email()" }));
    await waitFor(() => expect(screen.getByText("copied")).toBeInTheDocument());
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("restores focus to the trigger element after closing", async () => {
    render(<><button type="button">trigger</button><CommandPalette /></>);
    const trigger = screen.getByRole("button", { name: "trigger" });
    trigger.focus();
    fireEvent.keyDown(window, { key: "k", ctrlKey: true });
    fireEvent.keyDown(window, { key: "Escape" });
    await waitFor(() => expect(document.activeElement).toBe(trigger));
  });

  it("shows the requested empty state", () => {
    render(<CommandPalette />);
    fireEvent.keyDown(window, { key: "k", ctrlKey: true });
    fireEvent.change(screen.getByPlaceholderText("search tool calls..."), { target: { value: "zzzzzz" } });
    expect(screen.getByText("no tool matches. try: projects, resume, contact")).toBeInTheDocument();
  });

  it("cancels the warp animation loop on unmount", () => {
    const cancel = vi.fn();
    let callback: FrameRequestCallback | undefined;
    vi.stubGlobal("requestAnimationFrame", vi.fn((next: FrameRequestCallback) => { callback = next; return 7; }));
    vi.stubGlobal("cancelAnimationFrame", cancel);
    const { unmount } = render(<EmbeddingSpaceCanvas />);
    expect(callback).toBeDefined();
    unmount();
    expect(cancel).toHaveBeenCalledWith(7);
  });

  it("does not start a loop under reduced motion", () => {
    window.matchMedia = ((query: string) => ({ matches: query.includes("prefers-reduced-motion"), media: query, onchange: null, addListener: vi.fn(), removeListener: vi.fn(), addEventListener: vi.fn(), removeEventListener: vi.fn(), dispatchEvent: vi.fn() })) as typeof window.matchMedia;
    const raf = vi.fn();
    vi.stubGlobal("requestAnimationFrame", raf);
    render(<EmbeddingSpaceCanvas />);
    expect(raf).not.toHaveBeenCalled();
  });

  it("clears the home rocket timer on unmount", () => {
    Object.defineProperty(navigator, "hardwareConcurrency", { configurable: true, value: 8 });
    const timer = vi.spyOn(window, "setTimeout").mockReturnValue(19);
    const clear = vi.spyOn(window, "clearTimeout");
    const { unmount } = render(<EmbeddingSpaceCanvas />);
    expect(timer).toHaveBeenCalled();
    unmount();
    expect(clear).toHaveBeenCalledWith(19);
  });

  it("renders no skill labels in the warp background", () => {
    render(<EmbeddingSpaceCanvas />);
    expect(screen.queryByText("RAG")).not.toBeInTheDocument();
    expect(screen.queryByText("LangGraph")).not.toBeInTheDocument();
  });

  it("filters skills to the selected category", () => {
    render(<SkillsPage />);
    fireEvent.click(screen.getByRole("tab", { name: "AI & Machine Learning" }));
    expect(screen.getByRole("button", { name: "NLP" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Java" })).not.toBeInTheDocument();
  });

  it("does not create fake links for certifications without credentials", () => {
    render(<SkillsPage />);
    expect(screen.queryByRole("link", { name: /open credential/i })).not.toBeInTheDocument();
  });
});
