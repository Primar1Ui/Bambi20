export interface CaseStudy {
  id: string;
  title: string;
  client?: string;
  problem: string;
  solution: string;
  techStack: string[];
  results: string;
  metrics?: string[];
  github?: string;
  live?: string;
  featured: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'smart-spend-dashboard',
    title: 'Smart Expense and Budget Dashboard',
    problem:
      'The client needed a simple way to track spending and see budget progress without juggling spreadsheets or a heavy finance app.',
    solution:
      'I built a React and Next.js dashboard with Supabase for data storage. Users can log expenses, group them by category, and see budget totals update in real time on desktop and mobile.',
    techStack: ['React', 'Next.js', 'Tailwind CSS', 'Supabase'],
    results:
      'The client got a private expense tracker they could use daily. The app loads fast, works on mobile, and is deployed on Vercel for easy updates.',
    metrics: [
      'Live production deploy on Vercel',
      'Real-time expense and budget views',
      'Mobile-friendly dashboard layout',
    ],
    github: 'https://github.com/Primar1Ui/smart-spend-dashboard',
    live: 'https://smart-spend-dashboard.vercel.app/',
    featured: true,
  },
  {
    id: 'ai-customer-support-automation',
    title: 'AI Customer Support Automation',
    problem:
      'Support emails were piling up. The team needed incoming messages classified, logged, and answered faster without copying the same replies all day.',
    solution:
      'I built an n8n workflow triggered by Gmail. Groq classifies each message, Airtable stores the ticket, and the flow sends the right reply or flags cases that need a human. Errors are logged so nothing gets lost quietly.',
    techStack: ['n8n', 'Groq LLM', 'Gmail', 'Airtable', 'Supabase'],
    results:
      'Support intake became automatic. Common questions get handled quickly, tickets stay organized, and the team spends less time on repetitive email work.',
    metrics: [
      'Gmail-triggered workflow with branching logic',
      'AI classification plus structured ticket storage',
      'Automated replies with human handoff paths',
    ],
    featured: true,
  },
  {
    id: 'baxauto-website',
    title: 'BaxAuto Marketing Website',
    client: 'BaxAuto',
    problem:
      'BaxAuto needed a clean marketing site that explained their services clearly and worked well on phones.',
    solution:
      'I designed and built a Next.js landing page with Tailwind CSS. The layout focuses on service sections, fast load times, and basic SEO setup so the site is easy to find and read.',
    techStack: ['Next.js', 'Tailwind CSS', 'TypeScript'],
    results:
      'BaxAuto launched a professional site that matches their brand and performs well on mobile. Page speed and structure were part of the build from the start.',
    metrics: [
      'Responsive layout across screen sizes',
      'SEO-friendly page structure',
      'Fast static delivery via Vercel',
    ],
    github: 'https://github.com/Primar1Ui/v0-baxauto-website-development',
    live: 'https://v0-baxauto-website-development-qyak.vercel.app/',
    featured: false,
  },
];
