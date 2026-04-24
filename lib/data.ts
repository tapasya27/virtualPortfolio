export const bio = {
  name: "Tapasya Sharma",
  tagline: "Engineer, builder, and tinkerer.",
  summary:
    "I'm a software engineer who enjoys building fast, thoughtful interfaces and the systems behind them. I care about performance, craft, and tools that get out of the way.",
  location: "Remote",
  currently: "Building interactive experiences on the web",
  skills: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "PostgreSQL",
    "Framer Motion",
    "Tailwind CSS",
  ],
};

export const socials = [
  { label: "GitHub", href: "https://github.com/", icon: "github" },
  { label: "LinkedIn", href: "https://linkedin.com/", icon: "linkedin" },
  { label: "Email", href: "mailto:hello@example.com", icon: "mail" },
];

export type WorkItem = {
  company: string;
  role: string;
  period: string;
  summary: string;
};

export const workHistory: WorkItem[] = [
  {
    company: "Acme Corp",
    role: "Senior Software Engineer",
    period: "2024 — Present",
    summary: "Leading frontend architecture for the internal design system.",
  },
  {
    company: "Widgets Inc",
    role: "Software Engineer",
    period: "2021 — 2024",
    summary: "Built performance-critical data pipelines and dashboards.",
  },
  {
    company: "Startup Studio",
    role: "Software Engineer Intern",
    period: "2020",
    summary: "Shipped a customer-facing analytics feature end to end.",
  },
];

export type Project = {
  slug: string;
  title: string;
  blurb: string;
  details: string;
  tags: string[];
  demo?: string;
  repo?: string;
};

// Circular-ring stats (fillers — swap real numbers later)
export type Stat = {
  label: string;
  value: number;
  max: number;
  suffix?: string;
  color?: string;
};

export const experienceStats: Stat[] = [
  { label: "Years building", value: 5, max: 10, suffix: "+" },
  { label: "Companies", value: 3, max: 5 },
  { label: "Systems in prod", value: 12, max: 20 },
  { label: "Lines shipped", value: 87, max: 100, suffix: "K" },
];

export const projectStats: Stat[] = [
  { label: "Projects shipped", value: 24, max: 30 },
  { label: "GitHub stars", value: 142, max: 200 },
  { label: "Languages", value: 7, max: 10 },
  { label: "Open-source PRs", value: 38, max: 50 },
];

export const githubStats = {
  username: "tapasya",
  totalContributions: 1284,
  longestStreak: 47,
  currentStreak: 12,
  publicRepos: 28,
  followers: 64,
};

export const projects: Project[] = [
  {
    slug: "virtual-portfolio",
    title: "Virtual Portfolio",
    blurb: "This site. Next.js 15 + Framer Motion + a Claude chatbot.",
    details:
      "An interactive portfolio with scroll-driven animations, a filterable project grid, and an AI chat that answers visitor questions in my voice.",
    tags: ["Next.js", "TypeScript", "AI"],
    repo: "https://github.com/",
  },
  {
    slug: "pipeline-dashboard",
    title: "Pipeline Dashboard",
    blurb: "Realtime observability for a multi-stage data pipeline.",
    details:
      "WebSocket-driven dashboard rendering thousands of events per second with virtualized lists and a custom flame-graph view.",
    tags: ["React", "WebSockets", "Data"],
  },
  {
    slug: "mini-shell",
    title: "Mini Shell",
    blurb: "A tiny POSIX-ish shell written in Rust for fun.",
    details:
      "Supports pipes, redirects, job control, and a small set of builtins. Mostly an excuse to get better at Rust.",
    tags: ["Rust", "Systems"],
    repo: "https://github.com/",
  },
  {
    slug: "generative-cards",
    title: "Generative Greeting Cards",
    blurb: "SVG + noise functions to generate one-of-a-kind cards.",
    details:
      "Client-side SVG generator using simplex noise. Each card is deterministic from a seed so you can share them.",
    tags: ["Creative", "TypeScript"],
    demo: "https://example.com/",
  },
];
