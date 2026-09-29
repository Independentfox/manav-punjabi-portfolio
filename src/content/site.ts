/**
 * Single source of truth for every word on the site.
 *
 * Everything here is taken from Manav's current resume, his public GitHub
 * repositories (github.com/Independentfox) or the public Codeforces API.
 * If a fact can't be traced to one of those, it doesn't belong in this file.
 */

export const site = {
  name: "Manav Punjabi",
  firstName: "Manav",
  fullName: "Manav Ajay Punjabi",
  role: "Software Engineer",
  title: "Manav Punjabi — Software Engineer | AI/ML & Systems",
  description:
    "Software engineer building backend systems, ML infrastructure and AI tooling. Built a recommendation pipeline serving 300M+ users at Glance (InMobi). IIT Roorkee.",
  email: "manav_ap@ece.iitr.ac.in",
  resume: "/Manav-Punjabi-Resume.pdf",
  links: {
    github: "https://github.com/Independentfox",
    linkedin: "https://www.linkedin.com/in/manav-punjabi-861122282",
    codeforces: "https://codeforces.com/profile/Akaza_3",
  },
  handles: {
    github: "Independentfox",
    codeforces: "Akaza_3",
  },
} as const;

export const mailto = (subject?: string) =>
  `mailto:${site.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;

/** The rotating words after "& I build". */
export const buildWords = ["systems that scale", "ML infrastructure", "backend services", "AI tooling"];

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export type Role = {
  id: string;
  company: string;
  monogram: string;
  role: string;
  period: string;
  place?: string;
  bullets: string[];
  stack: string[];
};

export const experience: Role[] = [
  {
    id: "glance",
    company: "Glance · InMobi",
    monogram: "G",
    role: "Software & AI Engineering Intern",
    period: "May 2026 – Jul 2026",
    bullets: [
      "Built a content recommendation pipeline on a collaborative-filtering twin-tower approach, serving 300M+ users",
      "Developed a Databricks + Redis + AlloyDB pipeline for low-latency recommendation candidate generation",
      "Shipped production features across 9 services — ML infrastructure, AI tooling, observability and security — in 8 weeks",
    ],
    stack: ["Recommendation Systems", "Databricks", "Redis", "AlloyDB", "ML Infrastructure"],
  },
  {
    id: "airblack",
    company: "Airblack",
    monogram: "A",
    role: "Software Development Intern",
    period: "Oct 2025 – Apr 2026",
    bullets: [
      "Built the Zudo app end-to-end for an ed-tech platform: backend architecture, pricing logic and auth flows",
      "Developed real-time scheduling and payment modules handling 10k+ monthly transactions on low-latency APIs",
      "Deployed and maintained production services — fixing live issues and shipping features every week",
    ],
    stack: ["Backend Architecture", "Payments", "Auth", "Real-time Scheduling"],
  },
  {
    id: "noos",
    company: "NOOS Technologies",
    monogram: "N",
    role: "Research & Deep Learning Project Intern",
    period: "Jun 2025 – Aug 2025",
    bullets: [
      "Built encoder–decoder models that embed imperceptible data in images (deep-learning steganography)",
      "Implemented and compared LSB, DCT/DWT and a transformer-inspired neural ECC for robust retrieval",
      "Delivered a solution resilient to noise, cropping and compression",
    ],
    stack: ["Deep Learning", "Encoder–Decoder", "DCT / DWT", "Error Correction"],
  },
  {
    id: "ecell",
    company: "E-Cell, IIT Roorkee",
    monogram: "E",
    role: "Senior Manager, Startup Launchpad",
    period: "May 2025 – Present",
    place: "IIT Roorkee",
    bullets: [
      "Led the Startup Projects initiative, onboarding 5+ startups with real-world problem statements for student teams",
      "Managed teams delivering solutions across ML, deep learning, finance and consulting",
    ],
    stack: ["Leadership", "Startups"],
  },
];

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export type Project = {
  name: string;
  meta: string;
  description: string;
  stack: string[];
  href?: string;
};

export const projects: Project[] = [
  {
    name: "Self-Correcting Voice Agent Tester",
    meta: "Riverline · Feb 2026",
    description:
      "Five LLM agents generate adversarial personas, simulate calls, judge every transcript and rewrite the agent's script until it passes. Took agent success from 17% to 100% and cut iteration from weeks to ~15 minutes.",
    stack: ["Next.js", "TypeScript", "Groq", "LLaMA 3.3 70B"],
    href: "https://github.com/Independentfox/self-correcting-agent",
  },
  {
    name: "Market-Cap Growth Forecasting",
    meta: "GC Tech'25 · Apr 2025",
    description:
      "Forecasts 1-, 2- and 3-year market-cap growth for Indian companies from 28 financial indicators. Benchmarked MLP, LSTM, Transformer and a multi-horizon TCN with attention — best model under 20 RMSE. 1st runner-up among 8 contingents.",
    stack: ["PyTorch", "LSTM", "Transformer", "TCN"],
    href: "https://github.com/Independentfox/Market-Capitalization-Forecasting-with-Deep-Learning",
  },
  {
    name: "HealthQuery",
    meta: "E-Cell, IIT Roorkee · Dec 2024",
    description:
      "A question-answering assistant for scanned medical PDFs: Tesseract OCR, semantic chunking, sentence-transformer embeddings and similarity search, answered by a local Ollama LLM.",
    stack: ["Python", "Flask", "LangChain", "Ollama"],
  },
];

export const moreProjects: { name: string; blurb: string; href: string }[] = [
  {
    name: "CineDB",
    blurb: "movie platform on FastAPI + Postgres, deployed on Kubernetes",
    href: "https://github.com/Independentfox/HackDay-Inmobi",
  },
  {
    name: "CO-FOUNDER AI",
    blurb: "multi-agent system that stress-tests startup ideas",
    href: "https://github.com/Independentfox/ctrl-shift-defeat",
  },
  {
    name: "LeetCode runner",
    blurb: "VS Code extension that pulls test cases and judges locally",
    href: "https://github.com/Independentfox/LeetCode-Extension",
  },
  {
    name: "Collaborative coding",
    blurb: "real-time multi-user editor on Socket.IO",
    href: "https://github.com/Independentfox/Real-Time-Collaborative-Coding-Platform-for-Developer-Teams",
  },
  {
    name: "Watchlist Summarizer",
    blurb: "Chrome extension with an in-browser LLM",
    href: "https://github.com/Independentfox/Watchlist-Summarizer-WebAPP-",
  },
  {
    name: "Neural Uplift",
    blurb: "causal uplift modeling on the Criteo dataset",
    href: "https://github.com/Independentfox/Neural-Uplift",
  },
];

/* ------------------------------------------------------------------ */
/* Achievements & the rest                                             */
/* ------------------------------------------------------------------ */

export const achievements = [
  { mark: "AIR 1", what: "International Cyber Olympiad", note: "6,000+ participants" },
  { mark: "#5", what: "Global rank, Codeforces Round 1033 (Div. 2)", note: "& CodeNite 2025" },
  { mark: "AIR 909", what: "KVPY SA-Stream", note: "2021" },
  { mark: "AIR 1265", what: "JEE Advanced", note: "2023" },
  { mark: "AIR 1587", what: "JEE Main", note: "2023" },
  { mark: "Top 1%", what: "National Physics Olympiad", note: "2022" },
  { mark: "1st R-up", what: "Fidelfolio Investments — Finance + DL", note: "8 contingents" },
];

export const competitive = {
  title: "Candidate Master",
  maxRating: 1992,
  contestRank: 5,
};

export const chess = [
  { platform: "chess.com", peak: 2100 },
  { platform: "lichess", peak: 2200 },
];

export const education = {
  school: "IIT Roorkee",
  degree: "B.Tech. Electronics & Communication Engineering",
  minor: "Minor in Computer Science & Engineering",
  period: "2023 – 2027",
};

export const stack = [
  { group: "Languages", items: ["C++", "Python", "Java", "TypeScript", "JavaScript"] },
  { group: "Backend", items: ["Node.js", "Spring Boot", "FastAPI", "Flask", "React", "Next.js"] },
  { group: "Data & infra", items: ["Databricks", "Redis", "AlloyDB", "PostgreSQL", "Docker", "Kubernetes"] },
  { group: "ML & AI", items: ["PyTorch", "NumPy", "Pandas", "LangChain", "LLMs", "Recommender systems"] },
];
