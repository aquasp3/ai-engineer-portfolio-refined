import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TerminalBot } from "@/components/HeroSection";
import { parseCommand } from "@/lib/cliCommands";
import { matchIntent } from "@/lib/intents";

const navigateMock = vi.hoisted(() => vi.fn());
vi.mock("react-router-dom", () => ({ useNavigate: () => navigateMock }));

describe("CLI portfolio bot", () => {
  const defaultMatchMedia = window.matchMedia;

  beforeEach(() => {
    navigateMock.mockReset();
    Object.defineProperty(window, "open", { configurable: true, value: vi.fn() });
    window.matchMedia = ((query: string) => ({ matches: false, media: query, onchange: null, addListener: vi.fn(), removeListener: vi.fn(), addEventListener: vi.fn(), removeEventListener: vi.fn(), dispatchEvent: vi.fn() })) as typeof window.matchMedia;
  });

  afterEach(() => {
    window.matchMedia = defaultMatchMedia;
    vi.restoreAllMocks();
  });

  it("parses valid commands and safely handles empty input", () => {
    expect(parseCommand("  cd projects ")).toEqual({ raw: "cd projects", name: "cd", args: ["projects"], argument: "projects" });
    expect(parseCommand("")).toEqual({ raw: "", name: "", args: [], argument: "" });
  });

  it("suggests the corrected command for a typo", () => {
    expect(matchIntent("langgrph")?.suggestion).toBe("langgraph");
  });

  it("ignores a double Enter while navigation is running", async () => {
    render(<TerminalBot />);
    const input = screen.getByLabelText("Terminal command");
    fireEvent.change(input, { target: { value: "projects" } });
    fireEvent.keyDown(input, { key: "Enter" });
    fireEvent.keyDown(input, { key: "Enter" });
    await waitFor(() => expect(navigateMock).toHaveBeenCalledWith("/projects"));
    expect(navigateMock).toHaveBeenCalledTimes(1);
  });

  it("moves through the capped session history with ArrowUp", async () => {
    render(<TerminalBot />);
    fireEvent.click(screen.getByRole("button", { name: "projects" }));
    await waitFor(() => expect(navigateMock).toHaveBeenCalledWith("/projects"));
    fireEvent.click(screen.getByRole("button", { name: "skills" }));
    await waitFor(() => expect(navigateMock).toHaveBeenCalledWith("/skills"));
    const input = screen.getByLabelText("Terminal command") as HTMLInputElement;
    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(input.value).toBe("skills");
  });

  it("runs a command from a tappable chip", async () => {
    render(<TerminalBot />);
    fireEvent.click(screen.getByRole("button", { name: "contact" }));
    await waitFor(() => expect(navigateMock).toHaveBeenCalledWith("/contact"));
  });

  it("routes cd commands through the router once", async () => {
    render(<TerminalBot />);
    const input = screen.getByLabelText("Terminal command");
    fireEvent.change(input, { target: { value: "cd blogs" } });
    fireEvent.submit(input.closest("form")!);
    await waitFor(() => expect(navigateMock).toHaveBeenCalledWith("/blogs"));
    expect(navigateMock).toHaveBeenCalledTimes(1);
  });

  it("renders resume links with safe external-link attributes", () => {
    render(<TerminalBot />);
    const input = screen.getByLabelText("Terminal command");
    fireEvent.change(input, { target: { value: "open resume" } });
    fireEvent.keyDown(input, { key: "Enter" });
    const link = screen.getByRole("link", { name: /open resume/i });
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveAttribute("href", "/Sathvik-Konduri-Resume.pdf");
  });

  it("transitions from listening to routing to happy", async () => {
    render(<TerminalBot />);
    const input = screen.getByLabelText("Terminal command");
    fireEvent.change(input, { target: { value: "projects" } });
    expect(screen.getByText("node: listening")).toBeInTheDocument();
    fireEvent.keyDown(input, { key: "Enter" });
    expect(screen.getByText("node: thinking")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText("node: routing")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("node: happy")).toBeInTheDocument());
  });

  it("shows a confused state for an unknown command", () => {
    render(<TerminalBot />);
    const input = screen.getByLabelText("Terminal command");
    fireEvent.change(input, { target: { value: "xyzzy" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(screen.getByText("node: confused")).toBeInTheDocument();
    expect(screen.getByText(/command not found: xyzzy/)).toBeInTheDocument();
  });

  it("disables cursor tracking when reduced motion is enabled", () => {
    window.matchMedia = ((query: string) => ({ matches: query.includes("prefers-reduced-motion"), media: query, onchange: null, addListener: vi.fn(), removeListener: vi.fn(), addEventListener: vi.fn(), removeEventListener: vi.fn(), dispatchEvent: vi.fn() })) as typeof window.matchMedia;
    render(<TerminalBot />);
    const character = screen.getByText("node: idle").parentElement?.parentElement;
    fireEvent.mouseMove(window, { clientX: 0, clientY: 0 });
    expect(character).not.toHaveStyle("transform: perspective(700px) rotateX(8deg) rotateY(-12deg)");
  });
});
