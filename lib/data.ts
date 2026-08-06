export const skills = {
  frontend: [
    { name: 'HTML', level: 95 },
    { name: 'CSS', level: 95 },
    { name: 'JavaScript', level: 90 },
    { name: 'TypeScript', level: 88 },
    { name: 'React', level: 90 },
    { name: 'Next.js', level: 88 },
    { name: 'Tailwind CSS', level: 92 },
  ],
  backend: [
    { name: 'Node.js', level: 85 },
    { name: 'Supabase', level: 88 },
    { name: 'Firebase', level: 80 },
    { name: 'REST APIs', level: 90 },
  ],
  tools: [
    { name: 'Cursor', level: 90 },
    { name: 'GitHub', level: 92 },
    { name: 'n8n', level: 86 },
    { name: 'Zapier', level: 84 },
    { name: 'Airtable', level: 82 },
    { name: 'Groq AI', level: 80 },
    { name: 'Replit', level: 85 },
    { name: 'Vercel', level: 90 },
    { name: 'Rork AI', level: 82 },
  ],
  automation: [
    { name: 'n8n Workflows', level: 88 },
    { name: 'Zapier Zaps', level: 86 },
    { name: 'AI Agents', level: 84 },
    { name: 'Lead Automation', level: 87 },
    { name: 'Slack/Gmail Alerts', level: 85 },
    { name: 'Google Sheets Ops', level: 86 },
  ],
  deployment: [
    { name: 'Vercel', level: 90 },
    { name: 'CI/CD', level: 80 },
    { name: 'Database Management', level: 85 },
  ],
};

export const projects = [
  {
    title: "Portfolio Website",
    description: "High-performance developer portfolio optimized for SEO.",
    tech: ["Next.js", "Framer Motion"],
    category: "frontend",
    github: "https://github.com/Primar1Ui/refined-man-page",
    live: "https://v0-personal-portfolio-website-mocha-eta.vercel.app/",
    role: "Designer & developer",
    results: "Designed and developed a fast, SEO-friendly personal brand site with a strong contact funnel.",
    image: "/images/projects/portfolio-website.png",
  },
  {
    title: "BaxAuto Website",
    description: "Marketing website for BaxAuto, focused on clear service presentation and clean UI.",
    tech: ["Next.js", "Tailwind CSS"],
    category: "frontend",
    github: "https://github.com/Primar1Ui/v0-baxauto-website-development",
    live: "https://v0-baxauto-website-development-qyak.vercel.app/",
    role: "Frontend developer",
    results: "Delivered a responsive landing experience tailored to the client brand.",
    image: "/images/projects/baxauto-website.png",
  },
  {
    title: "Smart Expense & Budget Dashboard",
    description: "Web app for tracking expenses and managing budgets with an intuitive dashboard.",
    tech: ["React", "Next.js", "Tailwind CSS"],
    category: "full-stack",
    github: "https://github.com/Primar1Ui/smart-spend-dashboard",
    live: "https://smart-spend-dashboard.vercel.app/",
    role: "Full-stack developer",
    results: "Built a smart spend dashboard for expense tracking and budget visibility.",
    image: "/images/projects/smart-spend-dashboard.png",
    featured: true,
    metrics: ["Expense tracking", "Budget dashboard", "Production deploy"],
  },
  {
    title: "Refined Man",
    description: "Premium men's accessories e-commerce site with clean UI and smooth experience.",
    tech: ["Next.js", "Tailwind CSS"],
    category: "frontend",
    live: "https://refined-man.vercel.app/",
    role: "Frontend developer",
    results: "Designed and built a polished men's accessories storefront.",
    image: "/images/projects/refined-man.png",
  }
];

export const portfolioStats = {
  projects: projects.length,
  clients: 3,
  yearsExperience: 3,
  githubContributions: 100,
};

/** Canonical WhatsApp contacts used across Hero, Contact, Projects, Footer */
export const whatsappContacts = [
  {
    id: 'us',
    countryCode: 'US',
    label: 'United States',
    display: '+1 541 378 1097',
    href: 'https://wa.me/15413781097',
    primary: true,
  },
  {
    id: 'ng',
    countryCode: 'NG',
    label: 'Nigeria',
    display: '+234 906 408 2774',
    href: 'https://wa.me/2349064082774',
    primary: false,
  },
] as const;

export const primaryWhatsApp = whatsappContacts.find((c) => c.primary)!;

export const services = [
  "Frontend Development",
  "Backend Development",
  "Full-Stack Web Applications",
  "AI App Integration",
  "n8n Workflow Automation",
  "AI Lead Qualification",
  "Supabase Setup & Authentication",
  "Bug Fixing & Optimization",
  "SaaS MVP Development"
];

