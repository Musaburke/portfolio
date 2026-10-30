// The toolkit list on the home page. Each row lights up a picture of where it was used.
// `shot` must be a key in the `shots` map in src/components/Toolkit.astro.
export type Shot = 'dsbHome' | 'dsbServices' | 'dsbAreas' | 'renewlyDashboard' | 'renewlyRenewals' | 'security';
export type Tool = { name: string; usedIn: string; detail: string; shot: Shot };

export const toolkit: Tool[] = [
  {
    name: 'Astro',
    usedIn: 'DSB Cleaning',
    detail: 'Static pages and content collections for services, reviews and FAQs. This portfolio too.',
    shot: 'dsbServices',
  },
  {
    name: 'TypeScript',
    usedIn: 'DSB, Renewly',
    detail: 'Typed site data and components, so facts live in one file and the build catches mistakes.',
    shot: 'renewlyRenewals',
  },
  {
    name: 'Next.js & Supabase',
    usedIn: 'Renewly',
    detail: 'App Router, Postgres with Row Level Security, and TanStack Query for server state.',
    shot: 'renewlyDashboard',
  },
  {
    name: 'React',
    usedIn: 'DSB, Renewly',
    detail: 'Interactive parts only where needed: the quote form, the filterable gallery, the dashboard.',
    shot: 'dsbAreas',
  },
  {
    name: 'Web security',
    usedIn: 'DSB Cleaning',
    detail: 'An enforced Content Security Policy, security headers, and a form with a honeypot, time trap and length limits.',
    shot: 'security',
  },
  {
    name: 'Cyber security',
    usedIn: 'Learning now',
    detail: 'TODO(musa): what you are studying right now, e.g. TryHackMe paths or a certificate.',
    shot: 'security',
  },
];
