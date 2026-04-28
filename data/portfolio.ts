export const SKILLS = [
  { name: "React / Next.js", level: 92, category: "frontend" },
  { name: "TypeScript",      level: 88, category: "frontend" },
  { name: "Tailwind CSS",    level: 90, category: "frontend" },
  { name: "Framer Motion",   level: 82, category: "frontend" },
  { name: "Node.js",         level: 85, category: "backend" },
  { name: "Python",          level: 78, category: "backend" },
  { name: "PostgreSQL",      level: 75, category: "backend" },
  { name: "Docker",          level: 70, category: "devops" },
  { name: "AWS",             level: 65, category: "devops" },
  { name: "Figma",           level: 80, category: "design" },
];

export const TIMELINE = [
  {
    year: "2024 – Present",
    role: "Senior Frontend Developer",
    company: "Your Company",
    description:
      "Led development of a real-time dashboard serving 50k+ users. Migrated legacy codebase to Next.js 15, reducing load times by 40%. Mentored two junior developers.",
    tags: ["Next.js", "TypeScript", "Redis", "AWS"],
  },
  {
    year: "2022 – 2024",
    role: "Full-Stack Developer",
    company: "Previous Company",
    description:
      "Built and maintained REST APIs powering mobile applications with 100k+ downloads. Implemented CI/CD pipelines and led quarterly code reviews.",
    tags: ["React", "Node.js", "PostgreSQL", "Docker"],
  },
  {
    year: "2021 – 2022",
    role: "Frontend Developer",
    company: "Agency / Freelance",
    description:
      "Designed and developed marketing sites and SaaS dashboards for 8+ clients. Focused on accessibility, performance, and conversion optimization.",
    tags: ["React", "CSS", "Figma", "Shopify"],
  },
  {
    year: "2019 – 2021",
    role: "Computer Science Degree",
    company: "Your University",
    description:
      "Graduated with honours. Specialization in software systems. Thesis on distributed state management in real-time web applications.",
    tags: ["Algorithms", "Systems", "Research"],
    isEducation: true,
  },
];

export const PROJECTS = [
  {
    title: "VirtualPortfolio",
    description:
      "This portfolio — built with Next.js 15, Framer Motion animations, and a Claude-powered AI assistant that answers questions about me.",
    tech: ["Next.js", "Framer Motion", "Claude AI", "Tailwind"],
    github: "https://github.com/yourusername/virtualPortfolio",
    demo: "/",
    highlight: true,
    category: "Web",
  },
  {
    title: "Project Alpha",
    description:
      "A real-time collaboration tool built with WebSockets. Supports live cursors, shared document editing, and presence indicators.",
    tech: ["React", "Node.js", "WebSockets", "PostgreSQL"],
    github: "https://github.com/yourusername/project-alpha",
    demo: "https://project-alpha.vercel.app",
    highlight: false,
    category: "Web",
  },
  {
    title: "DataViz Dashboard",
    description:
      "Interactive analytics dashboard with filterable charts, dark/light mode, and CSV export. Built for a logistics client.",
    tech: ["React", "D3.js", "TypeScript", "REST API"],
    github: "https://github.com/yourusername/dataviz",
    demo: "https://dataviz-demo.vercel.app",
    highlight: false,
    category: "Data",
  },
  {
    title: "CLI Toolkit",
    description:
      "A Python CLI toolkit for automating repetitive dev tasks — scaffolding, environment setup, and deployment shortcuts.",
    tech: ["Python", "Click", "Docker", "Bash"],
    github: "https://github.com/yourusername/cli-toolkit",
    demo: null,
    highlight: false,
    category: "Tools",
  },
  {
    title: "Open Source Contribution",
    description:
      "Contributed accessibility improvements and TypeScript types to a popular open-source component library (5k+ stars).",
    tech: ["TypeScript", "Jest", "Storybook", "ARIA"],
    github: "https://github.com/yourusername/oss-contribution",
    demo: null,
    highlight: false,
    category: "OSS",
  },
];

export const SOCIAL = {
  github:   "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  email:    "hello@yourdomain.com",
  twitter:  "https://twitter.com/yourusername",
};
