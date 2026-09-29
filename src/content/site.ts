/**
 * Single source of truth for every word on the site.
 *
 * Everything here is taken from Manav's current resume, his public GitHub
 * repositories (github.com/Independentfox) or the public Codeforces API.
 * If a fact can't be traced to one of those, it doesn't belong in this file.
 */

export const site = {
  name: "Manav Punjabi",
  fullName: "Manav Ajay Punjabi",
  wordmark: "MANAV.",
  role: "Software Engineer",
  focus: "AI / ML · Systems · Backend",
  title: "Manav Punjabi — Software Engineer | AI/ML & Systems",
  description:
    "Software engineer building backend systems, ML infrastructure and AI tooling. Built a recommendation pipeline serving 300M+ users at Glance (InMobi). IIT Roorkee.",
  email: "manav_ap@ece.iitr.ac.in",
  location: "India",
  base: "IIT Roorkee",
  timezone: "Asia/Kolkata",
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

export const heroSignals = [
  "IIT Roorkee",
  "Glance · InMobi",
  "300M+ users",
  "Codeforces Candidate Master",
] as const;

export const pipelineStages = [
  { id: "user", label: "User", short: "User", note: "signals" },
  { id: "data", label: "Data", short: "Data", note: "pipelines" },
  { id: "model", label: "Model", short: "Model", note: "learning" },
  { id: "infra", label: "Infrastructure", short: "Infra", note: "serving" },
  { id: "product", label: "Product", short: "Product", note: "impact" },
] as const;

export type Metric = {
  value: number;
  prefix?: string;
  suffix?: string;
  display?: string;
  label: string;
  source: string;
};

export const metrics: Metric[] = [
  {
    value: 300,
    suffix: "M+",
    label: "users served by the recommendation pipeline I built",
    source: "glance/recsys",
  },
  {
    value: 9,
    label: "production services shipped in 8 weeks",
    source: "glance/services",
  },
  {
    value: 10,
    suffix: "k+",
    label: "monthly transactions through my scheduling & payment modules",
    source: "airblack/zudo",
  },
  {
    value: 100,
    prefix: "17→",
    suffix: "%",
    label: "voice-agent success rate after automated self-correction",
    source: "riverline/agent-qa",
  },
  {
    value: 20,
    prefix: "<",
    label: "RMSE from the best market-cap forecasting model",
    source: "gc-tech/forecast",
  },
  {
    value: 1992,
    label: "max Codeforces rating — Candidate Master",
    source: "codeforces/akaza_3",
  },
  {
    value: 5,
    prefix: "#",
    label: "global rank, Codeforces Round 1033 (Div. 2)",
    source: "codeforces/r1033",
  },
  {
    value: 1265,
    prefix: "AIR ",
    label: "JEE Advanced 2023",
    source: "jee/advanced-2023",
  },
];

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export type ArchNode = {
  id: string;
  label: string;
  sub: string;
  detail: string;
};

export const glance = {
  id: "glance",
  company: "Glance",
  parent: "InMobi",
  role: "Software & AI Engineering Intern",
  period: "May 2026 — Jul 2026",
  stage: "Scale",
  summary: "Recommendation infrastructure for a consumer platform at 300M+ user scale.",
  bullets: [
    "Built a content recommendation pipeline on a collaborative-filtering twin-tower approach, serving 300M+ users.",
    "Developed a Databricks + Redis + AlloyDB pipeline for low-latency recommendation candidate generation.",
    "Shipped production features across 9 services — ML infrastructure, AI tooling, observability and security — in 8 weeks.",
  ],
  figures: [
    { value: "300M+", label: "users served" },
    { value: "9", label: "services shipped" },
    { value: "8 wks", label: "to ship them" },
  ],
  domains: ["ML infrastructure", "AI tooling", "Observability", "Security"],
  tags: [
    "ML Infrastructure",
    "Recommendation Systems",
    "Databricks",
    "Redis",
    "AlloyDB",
    "Distributed Systems",
  ],
  architecture: [
    {
      id: "interactions",
      label: "User interactions",
      sub: "engagement signals",
      detail:
        "Implicit feedback from how users engage with content — the signal collaborative filtering learns from.",
    },
    {
      id: "towers",
      label: "Twin-tower model",
      sub: "collaborative filtering",
      detail:
        "A user tower and a content tower map both sides into a shared embedding space; relevance is how close they land.",
    },
    {
      id: "databricks",
      label: "Databricks pipeline",
      sub: "candidate generation",
      detail:
        "Pipeline compute that narrows a large content catalogue into relevant candidates for every user.",
    },
    {
      id: "serving",
      label: "Redis + AlloyDB",
      sub: "low-latency serving",
      detail: "Candidates land in Redis and AlloyDB so they can be fetched at request time with low latency.",
    },
    {
      id: "feed",
      label: "Personalized feed",
      sub: "300M+ users",
      detail: "Content recommendations delivered across a 300M+ user base.",
    },
  ] satisfies ArchNode[],
} as const;

export const airblack = {
  id: "airblack",
  company: "Airblack",
  role: "Software Development Intern",
  period: "Oct 2025 — Apr 2026",
  stage: "Product",
  summary: "Built the Zudo app end-to-end for an ed-tech platform — from backend architecture to payments.",
  bullets: [
    "Built the Zudo app end-to-end: backend architecture, pricing logic and auth flows.",
    "Developed real-time scheduling and payment modules handling 10k+ monthly transactions on low-latency APIs.",
    "Deployed and maintained production services — fixing live issues and shipping features every week.",
  ],
  modules: [
    { name: "architecture", status: "designed end-to-end" },
    { name: "auth", status: "flows shipped" },
    { name: "pricing", status: "logic owned" },
    { name: "scheduling", status: "real-time" },
    { name: "payments", status: "10k+ txns / month" },
    { name: "deploys", status: "weekly, in production" },
  ],
  tags: ["Backend Architecture", "Auth", "Payments", "Real-time Scheduling", "Production Ops"],
} as const;

export const noos = {
  id: "noos",
  company: "NOOS Technologies",
  role: "Research & Deep Learning Project Intern",
  period: "Jun 2025 — Aug 2025",
  stage: "Research",
  summary: "Deep-learning steganography — hiding data inside images so it survives the real world.",
  bullets: [
    "Built encoder–decoder models that embed imperceptible data in images.",
    "Implemented and compared LSB, DCT/DWT and a transformer-inspired neural ECC for robust retrieval.",
    "Delivered a solution resilient to noise, cropping and compression.",
  ],
  techniques: ["LSB", "DCT / DWT", "Neural ECC"],
  tags: ["Deep Learning", "Steganography", "Encoder–Decoder", "DCT / DWT", "Error Correction"],
} as const;

export const journey = [
  { id: noos.id, year: "2025.06", company: "NOOS", stage: noos.stage },
  { id: airblack.id, year: "2025.10", company: "Airblack", stage: airblack.stage },
  { id: glance.id, year: "2026.05", company: "Glance · InMobi", stage: glance.stage },
] as const;

/* ------------------------------------------------------------------ */
/* Range — where the work sits in the stack                            */
/* ------------------------------------------------------------------ */

export const layers = [
  { id: "algorithms", label: "Algorithms", note: "correctness, complexity, speed" },
  { id: "applications", label: "Applications", note: "products people use" },
  { id: "backend", label: "Backend", note: "APIs, auth, services" },
  { id: "data", label: "Data", note: "pipelines and stores" },
  { id: "ml", label: "ML Systems", note: "models inside systems" },
  { id: "production", label: "Production", note: "shipped, running, observed" },
] as const;

export type LayerId = (typeof layers)[number]["id"];

export const rangeWork: { id: string; label: string; layers: LayerId[] }[] = [
  { id: "glance", label: "Glance", layers: ["backend", "data", "ml", "production"] },
  { id: "airblack", label: "Airblack", layers: ["applications", "backend", "production"] },
  { id: "noos", label: "NOOS", layers: ["algorithms", "ml"] },
  { id: "agent", label: "Voice-agent QA", layers: ["applications", "ml"] },
  { id: "healthquery", label: "HealthQuery", layers: ["applications", "backend", "ml"] },
  { id: "forecast", label: "Market-cap forecasting", layers: ["data", "ml"] },
  { id: "codeforces", label: "Codeforces", layers: ["algorithms"] },
];

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export const voiceAgent = {
  index: "01",
  id: "voice-agent",
  title: "Self-Correcting Voice Agent Testing Platform",
  org: "Riverline",
  date: "Feb 2026",
  problem:
    "Testing conversational AI agents by hand is slow, and it never covers the adversarial conversations that break them.",
  system:
    "A five-agent loop that generates adversarial borrower personas, simulates conversations, judges every transcript, finds failure patterns and rewrites the agent's script — then tests again until it clears the bar.",
  results: [
    { value: "17% → 100%", label: "agent success rate" },
    { value: "weeks → ~15 min", label: "development cycle" },
  ],
  loop: [
    { label: "Generate", sub: "adversarial personas" },
    { label: "Simulate", sub: "full conversations" },
    { label: "Judge", sub: "score transcripts" },
    { label: "Analyze", sub: "failure patterns" },
    { label: "Rewrite", sub: "agent script" },
    { label: "Retest", sub: "until threshold" },
  ],
  stack: ["Next.js", "TypeScript", "Groq · LLaMA 3.3 70B", "LLM-as-judge"],
  repo: "https://github.com/Independentfox/self-correcting-agent",
} as const;

export const forecasting = {
  index: "02",
  id: "forecasting",
  title: "Market-Cap Growth Forecasting",
  org: "GC Tech'25 · IIT Roorkee",
  date: "Apr 2025",
  problem:
    "Predict 1-, 2- and 3-year market-cap growth for Indian companies from noisy, incomplete financial fundamentals.",
  system:
    "28 financial indicators → imputation, winsorization and scaling → four deep-learning architectures benchmarked across three horizons.",
  results: [
    { value: "<20", label: "RMSE, best model" },
    { value: "1st runner-up", label: "Fidelfolio PS, 8 contingents" },
  ],
  horizons: ["1Y", "2Y", "3Y"],
  models: [
    { name: "MLP", note: "feed-forward baseline" },
    { name: "LSTM", note: "sequential memory" },
    { name: "Transformer", note: "self-attention over time" },
    { name: "Multi-horizon TCN + Attention", note: "dilated causal convolutions", best: true },
  ],
  stack: ["Python", "PyTorch", "LSTM", "Transformer", "TCN", "Attention"],
  repo: "https://github.com/Independentfox/Market-Capitalization-Forecasting-with-Deep-Learning",
} as const;

export const healthQuery = {
  index: "03",
  id: "healthquery",
  title: "HealthQuery",
  subtitle: "AI-powered PDF assistant for healthcare",
  org: "E-Cell · IIT Roorkee",
  date: "Dec 2024 — Jan 2025",
  problem: "Medical records arrive as long, scanned PDFs. Finding one answer means reading all of them.",
  system:
    "OCR pulls the text out, semantic chunking splits it, sentence-transformer embeddings index it, and a local LLM answers from the most similar chunks.",
  pipeline: [
    { label: "PDF", sub: "scanned docs" },
    { label: "OCR", sub: "Tesseract" },
    { label: "Chunk", sub: "semantic" },
    { label: "Embed", sub: "Sentence Transformers" },
    { label: "Retrieve", sub: "similarity search" },
    { label: "Generate", sub: "Ollama LLM" },
  ],
  stack: ["Python", "Flask", "Node.js", "Tesseract OCR", "LangChain", "Ollama", "Sentence Transformers"],
} as const;

export type OtherBuild = {
  name: string;
  kind: string;
  blurb: string;
  detail: string;
  stack: string[];
  repo: string;
};

export const otherBuilds: OtherBuild[] = [
  {
    name: "CineDB",
    kind: "Hackathon · InMobi HackDay",
    blurb: "IMDB-style movie platform, deployed on Kubernetes.",
    detail:
      "Full-stack movie database: FastAPI + PostgreSQL backend, SPA frontend, a Kubernetes deployment running two API replicas, and a floating AI assistant.",
    stack: ["FastAPI", "PostgreSQL", "Kubernetes", "Docker"],
    repo: "https://github.com/Independentfox/HackDay-Inmobi",
  },
  {
    name: "CO-FOUNDER AI",
    kind: "Hackathon · team build",
    blurb: "Multi-agent system that stress-tests startup ideas.",
    detail:
      "Four agents — investor, VC, consultant and worst-case customer — analyze an idea in parallel, grounded in real startup datasets with a grounding score on every output.",
    stack: ["Multi-agent", "FastAPI", "React", "TypeScript"],
    repo: "https://github.com/Independentfox/ctrl-shift-defeat",
  },
  {
    name: "Real-time collaborative coding",
    kind: "Web platform",
    blurb: "Live multi-user code editing for remote teams.",
    detail:
      "Shared coding environment with real-time syncing and access control, built for low-latency multi-user editing.",
    stack: ["React", "Node.js", "Socket.IO"],
    repo: "https://github.com/Independentfox/Real-Time-Collaborative-Coding-Platform-for-Developer-Teams",
  },
  {
    name: "LeetCode test-case runner",
    kind: "VS Code extension",
    blurb: "Pulls test cases from a problem URL and judges your code locally.",
    detail:
      "Extracts test cases automatically from LeetCode problem URLs, runs C++ and Python solutions and shows the verdict in the editor.",
    stack: ["VS Code API", "TypeScript", "C++", "Python"],
    repo: "https://github.com/Independentfox/LeetCode-Extension",
  },
  {
    name: "Watchlist Summarizer",
    kind: "Chrome extension",
    blurb: "Save, organize and summarize reading lists — offline.",
    detail:
      "Browser extension for reading and watch-lists, summarizing content with an in-browser local LLM (WebLLM) so nothing leaves the device.",
    stack: ["React", "TypeScript", "WebLLM"],
    repo: "https://github.com/Independentfox/Watchlist-Summarizer-WebAPP-",
  },
  {
    name: "Neural Uplift",
    kind: "Causal ML",
    blurb: "Which user actions actually cause a purchase — and by how much.",
    detail:
      "Uplift-modeling pipeline using an S-learner with a neural backbone on the Criteo uplift dataset, with permutation-based feature attribution.",
    stack: ["Python", "causalml", "scikit-learn"],
    repo: "https://github.com/Independentfox/Neural-Uplift",
  },
  {
    name: "Asset Price Prediction",
    kind: "Time series",
    blurb: "Forecasting Google stock prices with sequence models.",
    detail:
      "Time-series forecasting with LSTM and XGBoost, including preprocessing, evaluation and visualization.",
    stack: ["Python", "LSTM", "XGBoost"],
    repo: "https://github.com/Independentfox/Asset-Price-Prediction",
  },
  {
    name: "European Option Pricing",
    kind: "Quant finance",
    blurb: "Binomial trees vs. Black–Scholes, validated on market data.",
    detail:
      "Comparative study of European option pricing with the Binomial Tree method and the Black–Scholes model, with sensitivity analysis.",
    stack: ["Python", "NumPy", "Black–Scholes"],
    repo: "https://github.com/Independentfox/European-Option-Pricing",
  },
];

/* ------------------------------------------------------------------ */
/* Method                                                              */
/* ------------------------------------------------------------------ */

export const principles = [
  {
    index: "01",
    title: "Start with the system",
    body: "Data flow, interfaces and failure modes first. Code second.",
    evidence: "Zudo — architecture, auth, pricing and payments designed end-to-end",
  },
  {
    index: "02",
    title: "Optimize for production",
    body: "Latency, reliability, observability and security are the product, not polish.",
    evidence: "Glance — 9 services across ML infra, observability and security",
  },
  {
    index: "03",
    title: "Measure everything",
    body: "A decision without a metric is an opinion. Benchmark, then choose.",
    evidence: "Forecasting — four architectures benchmarked on RMSE across 3 horizons",
  },
  {
    index: "04",
    title: "Ship, learn, iterate",
    body: "Build → test → measure → improve. Short loops beat big plans.",
    evidence: "Voice-agent QA — automated loop took success from 17% to 100%",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Beyond the codebase                                                 */
/* ------------------------------------------------------------------ */

export const competitive = {
  title: "Candidate Master",
  maxRating: 1992,
  handle: "Akaza_3",
  highlight: {
    contest: "Codeforces Round 1033 (Div. 2) & CodeNite 2025",
    rank: 5,
  },
};

export const chess = {
  title: "National-level player",
  ratings: [
    { platform: "chess.com", peak: 2100 },
    { platform: "lichess", peak: 2200 },
  ],
};

/* ------------------------------------------------------------------ */
/* Proof                                                               */
/* ------------------------------------------------------------------ */

export const achievements = [
  {
    mark: "AIR 1",
    what: "International Cyber Olympiad",
    note: "6,000+ participants · qualified for the international level",
  },
  {
    mark: "#5",
    what: "Global rank — Codeforces Round 1033 (Div. 2)",
    note: "& CodeNite 2025, organised by IIT KGP Codeclub",
  },
  { mark: "AIR 909", what: "KVPY SA-Stream", note: "2021" },
  { mark: "AIR 1265", what: "JEE Advanced", note: "2023" },
  { mark: "AIR 1587", what: "JEE Main", note: "2023" },
  { mark: "Top 1%", what: "National Physics Olympiad", note: "2022" },
  { mark: "1st R-up", what: "Fidelfolio Investments — Finance + DL", note: "among 8 contingents" },
] as const;

export const education = {
  school: "Indian Institute of Technology, Roorkee",
  degree: "B.Tech. Electronics & Communication Engineering",
  minor: "Minor in Computer Science & Engineering",
  period: "2023 — 2027",
};

export const leadership = {
  role: "Senior Manager, Startup Launchpad",
  org: "E-Cell, IIT Roorkee",
  detail:
    "Onboarded 5+ startups with real-world problem statements for student-led teams across ML, finance and consulting.",
};

/* ------------------------------------------------------------------ */
/* Toolchain                                                           */
/* ------------------------------------------------------------------ */

export type Tool = { name: string; usedIn: string };

export const toolchain: { group: string; tools: Tool[] }[] = [
  {
    group: "Languages",
    tools: [
      { name: "C++", usedIn: "Competitive programming · LeetCode runner" },
      { name: "Python", usedIn: "ML research · forecasting · HealthQuery" },
      { name: "Java", usedIn: "Spring Boot services" },
      { name: "TypeScript", usedIn: "Voice-agent QA · browser extensions" },
      { name: "JavaScript", usedIn: "Collaborative coding · HealthQuery" },
    ],
  },
  {
    group: "Backend",
    tools: [
      { name: "Node.js", usedIn: "HealthQuery · collaborative coding" },
      { name: "Spring Boot", usedIn: "REST + JPA services" },
      { name: "Flask", usedIn: "HealthQuery" },
      { name: "FastAPI", usedIn: "CineDB · CO-FOUNDER AI" },
      { name: "React", usedIn: "Collaborative coding · extensions" },
      { name: "Next.js", usedIn: "Voice-agent QA · this site" },
    ],
  },
  {
    group: "Data & Infra",
    tools: [
      { name: "Databricks", usedIn: "Glance candidate generation" },
      { name: "Redis", usedIn: "Glance low-latency serving" },
      { name: "AlloyDB", usedIn: "Glance low-latency serving" },
      { name: "PostgreSQL", usedIn: "CineDB" },
      { name: "Docker", usedIn: "CineDB · Docker Compose" },
      { name: "Kubernetes", usedIn: "CineDB, 2 API replicas" },
      { name: "FireHydrant", usedIn: "Incident management & observability" },
    ],
  },
  {
    group: "ML & AI",
    tools: [
      { name: "PyTorch", usedIn: "Forecasting · encoder–decoder models" },
      { name: "NumPy", usedIn: "Everywhere numerical" },
      { name: "Pandas", usedIn: "Data preparation" },
      { name: "Recommender systems", usedIn: "Glance twin-tower pipeline" },
      { name: "LLMs", usedIn: "Voice-agent QA · HealthQuery" },
      { name: "LangChain", usedIn: "HealthQuery" },
      { name: "Embeddings", usedIn: "Sentence Transformers · similarity search" },
    ],
  },
];

export const navLinks = [
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#method" },
  { label: "Contact", href: "#contact" },
] as const;

export const sections = [
  { id: "top", label: "Top", hint: "Back to the start" },
  { id: "signal", label: "At a glance", hint: "Metrics" },
  { id: "experience", label: "Experience", hint: "Glance · Airblack · NOOS" },
  { id: "range", label: "Across the stack", hint: "Algorithms → production" },
  { id: "projects", label: "Projects", hint: "Case studies" },
  { id: "method", label: "How I build", hint: "Engineering principles" },
  { id: "beyond", label: "Beyond the codebase", hint: "Codeforces · chess" },
  { id: "proof", label: "Achievements", hint: "Ranks and results" },
  { id: "toolchain", label: "Skills", hint: "Toolchain" },
  { id: "contact", label: "Contact", hint: "Email · LinkedIn" },
] as const;
