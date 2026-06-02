export const SKILLS = [
  // Building With — current toolkit
  { name: "Azure",         logo: "/logos/skills/azure.png",        tier: "daily" },
  { name: "Azure DevOps",  logo: "/logos/skills/azure-devops.png", tier: "daily" },
  { name: "C#",            logo: "/logos/skills/csharp.png",       tier: "daily" },
  { name: "Databricks",    logo: "/logos/skills/databricks.png",   tier: "daily" },
  { name: "Git",           logo: "/logos/skills/git.png",          tier: "daily" },
  { name: "Kusto (KQL)",   logo: "/logos/skills/kql.png",          tier: "daily" },
  { name: "PySpark",       logo: "/logos/skills/pyspark.png",      tier: "daily" },
  { name: "Python",        logo: "/logos/skills/python.png",       tier: "daily" },
  { name: "SQL",           logo: "/logos/skills/sql.png",          tier: "daily" },

  // Have Built With — shipped in past roles
  { name: "AWS",           logo: "/logos/skills/aws.png",          tier: "production" },
  { name: "BigML",         logo: "/logos/skills/bigml.png",        tier: "production" },
  { name: "Expo Go",       logo: "/logos/skills/expo-go.png",      tier: "production" },
  { name: "GCP",           logo: "/logos/skills/gcp.png",          tier: "production" },
  { name: "Next.js",       logo: "/logos/skills/nextjs.png",       tier: "production" },
  { name: "R",             logo: "/logos/skills/r.png",            tier: "production" },
  { name: "React",         logo: "/logos/skills/react.png",        tier: "production" },
  { name: "React Native",  logo: "/logos/skills/react-native.png", tier: "production" },
  { name: "RPA",           logo: "/logos/skills/rpa.png",          tier: "production" },
  { name: "Tailwind CSS",  logo: "/logos/skills/tailwind.png",     tier: "production" },
  { name: "TypeScript",    logo: "/logos/skills/typescript.png",   tier: "production" },
];

export const TIMELINE = [
  {
    year: "Feb 2026 – Present",
    role: "Software Engineer II",
    company: "Microsoft",
    logo: "/logos/microsoft.svg",
    bullets: [
      "Contributing to the Microsoft Organization Repository — source of truth for Legal Entity IDs and family hierarchies.",
      "Powering data products that represent commercial organizations across Microsoft and its customers.",
      "Served as a primary on-call responder for production incidents involving internal app security and Azure certificate management.",
    ],
    tags: ["C#", "Distributed Systems", "Azure", "Data Products"],
  },
  {
    year: "Aug 2023 – Feb 2026",
    role: "Software Engineer",
    company: "Microsoft",
    logo: "/logos/microsoft.svg",
    bullets: [
      "Built zero-touch C# automation to deploy 15+ Azure resources (monitoring, telemetry, Key Vault, storage, networking) consistently across environments.",
      "Consolidated 15 legacy release pipelines into 4 standardized YAML pipelines — a 60% reduction — aligned with Zero Trust principles.",
      "Shipped testing milestones two weeks ahead of schedule, accelerating overall delivery timelines.",
      "Authored Kusto (KQL) queries to detect and repair ~1,000 inconsistent records across sister services, preventing future customer data inconsistencies.",
      "Acted as primary on-call responder for production incidents around internal app security and Azure certificate management.",
    ],
    tags: ["C#", "Azure", "KQL", "CI/CD", "Zero Trust"],
  },
  {
    year: "Jun 2022 – Sep 2022",
    role: "Software Engineer Intern",
    company: "Microsoft",
    logo: "/logos/microsoft.svg",
    bullets: [
      "Optimized the Big Catalog partner onboarding pipeline — cut onboarding from two weeks to two days.",
      "Launched Stories @ Microsoft, an internal platform connecting interns with FTEs; helped onboard 3 full-timers.",
    ],
    tags: ["C#", "Distributed Systems", "Azure DevOps", "Pipelines"],
  },
  {
    year: "Jun 2021 – Sep 2021",
    role: "SWE / PM Explore Intern",
    company: "Microsoft",
    logo: "/logos/microsoft.svg",
    bullets: [
      "Co-built and shipped the Azure Sentinel Data Exploration Toolset (ASDET) with a team of two engineers.",
      "Added data inference, feature engineering, and anomaly detection capabilities to strengthen threat detection workflows.",
    ],
    link: {
      label: "Read the Microsoft Tech Community write-up on ASDET",
      url: "https://techcommunity.microsoft.com/blog/microsoftsentinelblog/introducing-azure-sentinel-data-exploration-toolset-asdet/2712728",
    },
    tags: ["Python", "Azure Sentinel", "Anomaly Detection", "Security"],
  },
  {
    year: "Sep 2020 – Mar 2021",
    role: "Applications Developer Co-op",
    company: "CSL Behring",
    logo: "/logos/csl.svg",
    bullets: [
      "Designed an accessible UI layer for Oracle APEX applications used by 5,000+ patients and pharma users.",
      "Led RPA efforts on manual workflows, saving 5+ hours per week.",
    ],
    tags: ["Oracle APEX", "RPA", "Accessibility", "Biotech"],
  },
  {
    year: "Sep 2019 – Mar 2020",
    role: "Transmissions & Substations Co-op",
    company: "PECO, an Exelon Company",
    logo: "/logos/peco.svg",
    bullets: [
      "Adapted an open-source handwriting recognition model (CNN + RNN + CTC) to digitize handwritten asset cards dating back to the 1900s.",
      "Automated manual data extraction, manipulation, and distribution via Python, Cascade, and Asset Suite 8 — saving ~$2,080 per employee per year.",
      "Built a Python reconciliation platform that cross-checks Cascade Server and Asset Suite 8 data, saving ~$7,992 per employee over six months and reducing discrepancies.",
    ],
    tags: ["Python", "PL/SQL", "MySQL", "CNN/RNN", "Asset Suite 8"],
  },
];

export const PROJECTS = [
  {
    title: "Squad",
    description:
      "Open-source project in the Squad ecosystem, contributing product features and collaborative development workflows.",
    tech: ["Open Source", "Web App", "Product Engineering"],
    github: "https://github.com/squadrepo/squad",
    demo: null,
    highlight: true,
    category: "Open Source",
  },
  {
    title: "ASDET",
    description:
      "Azure Sentinel Data Exploration Toolset (ASDET) repository, supporting data exploration and security analytics workflows.",
    tech: ["Python", "Security", "Azure Sentinel"],
    github: "https://github.com/microsoft/ASDET",
    demo: null,
    highlight: true,
    category: "Open Source",
  },
  {
    title: "Lively",
    description:
      "CS375 final project repository for Lively, a collaborative application built as a team software engineering project.",
    tech: ["TypeScript", "Web App", "Team Project"],
    github: "https://github.com/AzraGal/CS375FinalProject-Lively",
    demo: null,
    highlight: false,
    category: "Web",
  },
  {
    title: "VirtualPortfolio",
    description:
      "My personal portfolio built with Next.js 15, Framer Motion, and an AI chat + live GitHub contributions heatmap.",
    tech: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    github: "https://github.com/tapasya27/virtualPortfolio",
    demo: "/",
    highlight: true,
    category: "Web",
  },
  {
    title: "INFO 442 Project",
    description:
      "Course project repository for INFO 442 focused on applied data work and interactive analysis deliverables.",
    tech: ["JavaScript", "Data Analysis", "Visualization"],
    github: "https://github.com/tapasya27/INFO-442",
    demo: null,
    highlight: true,
    category: "Data",
  },
];

export const SOCIAL = {
  github:   "https://github.com/tapasya27",
  linkedin: "https://www.linkedin.com/in/tapasya27",
  email:    "t.sharm7377@gmail.com",
};
