import { describe, expect, it } from "vitest";
import { matchIntent } from "@/lib/intentRouter";

describe("matchIntent", () => {
  it.each([
    ["RAG", "projects"], ["vector search", "projects"], ["chroma", "projects"], ["langgraph", "projects"],
    ["NLP", "projects"], ["fastapi", "skills"], ["tech stack", "skills"], ["internship", "experience"],
    ["VP leadership", "experience"], ["medium writing", "blogs"], ["email", "contact"], ["hire me", "contact"],
    ["resume", "resume"], ["cv", "resume"], ["github", "github"], ["linkedin", "linkedin"],
  ])("routes %s to %s", (query, target) => expect(matchIntent(query)?.target).toBe(target));
  it("suggests a near miss", () => expect(matchIntent("langgrph")?.suggestion).toBe("langgraph"));
  it("returns null for empty input and gibberish", () => {
    expect(matchIntent("")).toBeNull();
    expect(matchIntent("qzxxv no route")).toBeNull();
  });
});
