import React from "react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { useActiveSection } from "@/hooks/useActiveSection";

interface ObserverInstance {
  callback: IntersectionObserverCallback;
  observed: Set<Element>;
  disconnect: ReturnType<typeof vi.fn>;
  unobserve: ReturnType<typeof vi.fn>;
}

const observerInstances: ObserverInstance[] = [];

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin = "0px";
  readonly thresholds: ReadonlyArray<number> = [0];

  private instance: ObserverInstance;

  constructor(callback: IntersectionObserverCallback) {
    this.instance = {
      callback,
      observed: new Set<Element>(),
      disconnect: vi.fn(),
      unobserve: vi.fn(),
    };
    observerInstances.push(this.instance);
  }

  observe = (target: Element) => {
    this.instance.observed.add(target);
  };

  unobserve = (target: Element) => {
    this.instance.observed.delete(target);
    this.instance.unobserve(target);
  };

  disconnect = () => {
    this.instance.disconnect();
    this.instance.observed.clear();
  };

  takeRecords = () => [];
}

const HookHarness = ({ sectionIds }: { sectionIds: string[] }) => {
  const active = useActiveSection(sectionIds);
  return <div data-testid="active">{active}</div>;
};

const createEntry = (
  target: Element,
  intersectionRatio: number,
  isIntersecting: boolean
): IntersectionObserverEntry => ({
  target,
  intersectionRatio,
  isIntersecting,
  boundingClientRect: {} as DOMRectReadOnly,
  intersectionRect: {} as DOMRectReadOnly,
  rootBounds: null,
  time: 0,
});

describe("useActiveSection", () => {
  beforeEach(() => {
    observerInstances.length = 0;
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver as unknown as typeof IntersectionObserver);

    document.body.innerHTML = `
      <section id="about"></section>
      <section id="skills"></section>
      <section id="projects"></section>
    `;
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    document.body.innerHTML = "";
  });

  it("tracks the most visible section and updates under fast scrolling", () => {
    render(<HookHarness sectionIds={["about", "skills", "projects"]} />);
    const active = screen.getByTestId("active");

    const observer = observerInstances[0];
    const about = document.getElementById("about")!;
    const skills = document.getElementById("skills")!;
    const projects = document.getElementById("projects")!;

    act(() => {
      observer.callback([
        createEntry(about, 0.8, true),
        createEntry(skills, 0.2, true),
        createEntry(projects, 0, false),
      ] as IntersectionObserverEntry[], {} as IntersectionObserver);
    });

    expect(active).toHaveTextContent("about");

    // Simulate fast scroll where previous section leaves and next section dominates.
    act(() => {
      observer.callback([
        createEntry(about, 0, false),
        createEntry(skills, 0.9, true),
      ] as IntersectionObserverEntry[], {} as IntersectionObserver);
    });

    expect(active).toHaveTextContent("skills");
  });

  it("handles partial visibility by selecting highest intersection ratio", () => {
    render(<HookHarness sectionIds={["about", "skills", "projects"]} />);
    const active = screen.getByTestId("active");

    const observer = observerInstances[0];
    const about = document.getElementById("about")!;
    const skills = document.getElementById("skills")!;

    act(() => {
      observer.callback([
        createEntry(about, 0.36, true),
        createEntry(skills, 0.54, true),
      ] as IntersectionObserverEntry[], {} as IntersectionObserver);
    });

    expect(active).toHaveTextContent("skills");
  });

  it("cleans up observer subscriptions on unmount", () => {
    const { unmount } = render(<HookHarness sectionIds={["about", "skills", "projects"]} />);
    const observer = observerInstances[0];

    const observedCount = observer.observed.size;
    expect(observedCount).toBeGreaterThan(0);

    unmount();

    expect(observer.unobserve).toHaveBeenCalledTimes(observedCount);
    expect(observer.disconnect).toHaveBeenCalledTimes(1);
  });

  it("does not create observer when section IDs are missing in DOM", () => {
    document.body.innerHTML = "";
    render(<HookHarness sectionIds={["missing-1", "missing-2"]} />);

    expect(observerInstances.length).toBe(0);
  });
});
