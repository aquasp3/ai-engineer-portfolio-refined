export const contact = {
  email: "sathvikkonduri14@gmail.com",
  mailto: "mailto:sathvikkonduri14@gmail.com",
  linkedin: "https://www.linkedin.com/in/sathvik-konduri",
  github: "https://github.com/aquasp3",
  medium: "https://medium.com/@sathvikkonduri14",
  portfolio: "https://sathvikkonduri.vercel.app",
  resume: "/Sathvik-Konduri-Resume.pdf",
};

export type Project = {
  title: string;
  tag: string;
  summary: string;
  outcome: string;
  repo: string;
  stack: string[];
  stages: { label: string; note: string }[];
};

export const projects: Project[] = [
  {
    title: "RAG-Based SaaS Billing Assistant (HITL)",
    tag: "LANGGRAPH / OLLAMA / CHROMADB / PYTHON",
    summary: "Grounded enterprise billing assistant with discrete retrieval and generation stages.",
    outcome: "HITL approval before refund actions.",
    repo: "rag-billing-assistant-hitl",
    stack: ["LangGraph", "Ollama", "ChromaDB", "Python"],
    stages: [
      { label: "Docs", note: "Enterprise billing documentation is the grounded source." },
      { label: "ChromaDB", note: "Relevant documentation chunks are retrieved from the vector store." },
      { label: "LangGraph", note: "Retrieval and generation run as explicit workflow stages." },
      { label: "HITL approval", note: "Refund requests pause for a human approval before action." },
    ],
  },
  {
    title: "India Post Decision Support System (DSS)",
    tag: "PYTHON / STREAMLIT / PANDAS / PLOTLY",
    summary: "Modular 12-month rural outreach planner using demographic and environmental data.",
    outcome: "Explainable rules, multilingual UI, PDF/CSV export.",
    repo: "India-Post-Decision-support-system",
    stack: ["Python", "Streamlit", "Pandas", "Plotly", "Scikit-Learn"],
    stages: [
      { label: "Village data", note: "Demographic and environmental inputs establish local context." },
      { label: "Risk assessment", note: "Environmental risk and lifecycle signals shape recommendations." },
      { label: "Planning engine", note: "Explainable business rules generate a diverse 12-month plan." },
      { label: "Officer dashboard", note: "English, Hindi, Telugu, Tamil, and Kannada support field use." },
    ],
  },
  {
    title: "Fake News Detection",
    tag: "PYTHON / SCIKIT-LEARN / NLP / TF-IDF",
    summary: "NLP classification pipeline with preprocessing, feature engineering, and evaluation.",
    outcome: "87% reported accuracy.",
    repo: "fake-news-detection",
    stack: ["Python", "Scikit-Learn", "NLP", "TF-IDF"],
    stages: [
      { label: "News text", note: "Input articles are normalized for downstream modeling." },
      { label: "TF-IDF", note: "Term frequency and inverse document frequency create features." },
      { label: "Classifier", note: "Candidate models are trained and compared on labeled data." },
      { label: "Evaluation", note: "The reported best result is 87% accuracy." },
    ],
  },
  {
    title: "Air Quality Index (AQI) Prediction",
    tag: "PYTHON / PANDAS / SCIKIT-LEARN",
    summary: "Regression modeling with exploratory analysis of environmental data.",
    outcome: "R² score of 0.85.",
    repo: "ai-engineer-portfolio-refined",
    stack: ["Python", "Pandas", "Scikit-Learn"],
    stages: [
      { label: "Air data", note: "Environmental measurements are prepared for analysis." },
      { label: "EDA", note: "Exploratory analysis identifies useful relationships and features." },
      { label: "Regression", note: "A regression model estimates air-quality values." },
      { label: "R² = 0.85", note: "The verified reported model score is 0.85." },
    ],
  },
  {
    title: "Medical Appointment Booking System",
    tag: "PYTHON / FASTAPI / REST",
    summary: "REST APIs for scheduling, doctor availability, patient bookings, and CRUD operations.",
    outcome: "Specialty and availability search included.",
    repo: "fastapi-medical-appointment-system",
    stack: ["Python", "FastAPI"],
    stages: [
      { label: "Request", note: "Validated API requests enter the booking workflow." },
      { label: "Availability", note: "Doctor schedules are managed and filtered by availability." },
      { label: "Booking", note: "Patient appointments are created and updated through CRUD APIs." },
      { label: "Search", note: "Specialty and availability filters help locate suitable doctors." },
    ],
  },
];

export const experience = [
  ["Vice President", "Street Cause, MCET", "Aug 2025 – May 2026", "Led a team of 10+ volunteers to organize campus social-impact initiatives and community outreach programs."],
  ["Machine Learning Intern", "Internship.com", "Apr 2025 – Jun 2025", "Developed regression and classification models using Scikit-Learn and Pandas, improving prediction accuracy by 12% through feature engineering and preprocessing."],
  ["AI-ML Virtual Intern", "Google (EduSkills | AICTE)", "Jan 2025 – Mar 2025", "Practiced supervised learning, data handling, and model evaluation workflows using TensorFlow, Google Colab, and Jupyter Notebooks."],
  ["Python Full Stack Virtual Intern", "EduSkills (AICTE)", "Oct 2024 – Dec 2024", "Developed Python-based web applications implementing CRUD workflows and REST APIs."],
];

export const skills = {
  Programming: ["Python", "Java", "C", "SQL"],
  "AI & Machine Learning": ["Machine Learning", "NLP", "RAG", "LangGraph", "Ollama", "ChromaDB", "Scikit-Learn", "TensorFlow"],
  "Backend & Data": ["FastAPI", "REST APIs", "CRUD Architecture", "Pandas", "NumPy", "Plotly"],
  Tools: ["Git", "GitHub", "Streamlit", "Jupyter"],
};

export const certifications = [
  "Machine Learning Workshop — Innomatics (2025)",
  "Python Programming Certification — Udemy",
  "Data Analytics Essentials",
  "Introduction to Modern AI",
];
