export type IntentTarget = "projects" | "experience" | "skills" | "blogs" | "contact" | "resume" | "github" | "linkedin";

export type IntentMatch = {
  target: IntentTarget;
  keyword: string;
  suggestion?: string;
};

const keywordTargets: Record<string, IntentTarget> = {
  rag: "projects", vector: "projects", chroma: "projects", chromadb: "projects", langgraph: "projects", nlp: "projects",
  project: "projects", projects: "projects", fastapi: "skills", skill: "skills", skills: "skills", stack: "skills", tech: "skills",
  intern: "experience", internship: "experience", experience: "experience", work: "experience", vp: "experience", leadership: "experience",
  blog: "blogs", blogs: "blogs", medium: "blogs", writing: "blogs",
  contact: "contact", email: "contact", hire: "contact", reach: "contact",
  resume: "resume", cv: "resume", github: "github", linkedin: "linkedin",
};

const synonyms: Record<string, string> = {
  retrieval: "rag", vectorstore: "vector", vectorstoredb: "chroma", api: "fastapi", backend: "fastapi",
  job: "work", jobs: "work", article: "blog", articles: "blogs", recruiter: "hire", connect: "reach",
};

const distance = (left: string, right: string) => {
  const matrix = Array.from({ length: left.length + 1 }, (_, row) => Array(right.length + 1).fill(row));
  for (let column = 0; column <= right.length; column++) matrix[0][column] = column;
  for (let row = 1; row <= left.length; row++) {
    for (let column = 1; column <= right.length; column++) {
      matrix[row][column] = left[row - 1] === right[column - 1]
        ? matrix[row - 1][column - 1]
        : Math.min(matrix[row - 1][column] + 1, matrix[row][column - 1] + 1, matrix[row - 1][column - 1] + 1);
    }
  }
  return matrix[left.length][right.length];
};

export const normalizeIntent = (value: string) => value.toLowerCase().trim().replace(/[^\w\s-]/g, " ");

export const matchIntent = (value: string): IntentMatch | null => {
  const normalized = normalizeIntent(value);
  if (!normalized) return null;
  const tokens = normalized.split(/\s+/).map((token) => synonyms[token] ?? token);
  for (const token of tokens) {
    if (keywordTargets[token]) return { target: keywordTargets[token], keyword: token };
  }
  const candidates = Object.keys(keywordTargets)
    .map((keyword) => ({ keyword, score: distance(tokens.join(" "), keyword) }))
    .sort((left, right) => left.score - right.score);
  const nearest = candidates[0];
  if (nearest && nearest.score <= Math.max(1, Math.floor(nearest.keyword.length / 3))) {
    return { target: keywordTargets[nearest.keyword], keyword: nearest.keyword, suggestion: nearest.keyword };
  }
  return null;
};

export const intentTargetPath: Record<IntentTarget, string> = {
  projects: "/projects", experience: "/experience", skills: "/skills", blogs: "/blogs", contact: "/contact",
  resume: "/Sathvik-Konduri-Resume.pdf", github: "https://github.com/aquasp3", linkedin: "https://www.linkedin.com/in/sathvik-konduri",
};

export const intentLabels: Record<IntentTarget, string> = {
  projects: "projects", experience: "experience", skills: "skills", blogs: "blogs", contact: "contact",
  resume: "resume", github: "GitHub", linkedin: "LinkedIn",
};
